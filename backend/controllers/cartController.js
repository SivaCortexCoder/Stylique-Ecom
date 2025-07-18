import userModel from "../models/userModel.js";

// Add to Cart
export const addToCart = async (req, res) => {
  const { uid, productId, quantity, size } = req.body;

  try {
    const user = await userModel.findOne({ uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity, size });
    }

    await user.save();

    const updatedUser = await userModel.findOne({ uid }).populate('cart.productId');
    res.status(200).json({ cart: updatedUser.cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Cart Items
export const getCartItems = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await userModel.findOne({ uid }).populate('cart.productId');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validCart = user.cart.filter(item => item.productId !== null);
    res.status(200).json(validCart);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove From Cart
export const removeFromCart = async (req, res) => {
  const { uid, productId, size } = req.body;

  try {
    const user = await userModel.findOne({ uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart.filter(
      (item) => !(item.productId.toString() === productId && item.size === size)
    );

    await user.save();

    const updatedUser = await userModel.findOne({ uid }).populate('cart.productId');
    res.status(200).json({ cart: updatedUser.cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Cart Item Quantity
export const updateCartItem = async (req, res) => {
  const { uid, productId, size, quantity } = req.body;

  try {
    const user = await userModel.findOne({ uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const item = user.cart.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (item) {
      item.quantity = quantity;
      await user.save();

      const updatedUser = await userModel.findOne({ uid }).populate('cart.productId');
      return res.status(200).json({ cart: updatedUser.cart });
    }

    res.status(404).json({ message: 'Item not found' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const clearCart = async (req, res) => {
    const { uid } = req.body;

    if (!uid) {
        return res.status(400).json({
            success: false,
            message: "User ID is required"
        });
    }

    try {
        const user = await userModel.findOne({ uid });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.cart = [];
        await user.save();

        res.json({
            success: true,
            message: "Cart cleared successfully",
            cart: []
        });
    } catch (error) {
        console.error("Clear cart error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to clear cart",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
