import userModel from "../models/userModel.js";


export const registerUser = async(req,res)=>{
    const {uid,email} = req.body;

    try {
        let user = await userModel.findOne({uid})
        if(!user){
           const newUser = userModel({uid,email,cart:[],orders:[]}) 
           user = await newUser.save();
        }
        res.status(200).json({user})
        
    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
}

export const isAdmin = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userModel.findOne({ uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};