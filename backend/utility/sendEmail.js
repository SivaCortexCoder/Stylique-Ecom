import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, 
  },
});

export const sendOrderConfirmation = async (to, orderId) => {
  const mailOptions = {
    from: `"Your Store Name" <${process.env.MAIL_USER}>`,
    to: to,
    subject: "Order Confirmation",
    html: `<h2>Your Order Has Been Placed Successfully</h2>
           <p>Thank you for your purchase! Your order ID is <strong>${orderId}</strong>.</p>
           <p>We'll notify you when your order is on the way.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent");
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
};
