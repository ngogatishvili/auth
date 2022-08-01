
const User=require("../models/User");



exports.registerUser=async(req,res,next)=>{
    const {username,email,password}=req.body;
    try{
        const user=await User.create({
            username,email,password
        })
        res.status(201).json({success:true,user})
    }catch(err) {
        return next(err);
    }
}


exports.loginUser=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password) {
        return res.status(400).json({success:false,error:"please provide email and password"})
    }
    try{
    const user=await User.findOne({email}).select("+password")
    if(!user) return res.status(404).json({success:false,error:"Email not found"})
    const isMatch=await user.comparePassword(password);
    if(!isMatch) return res.status(401).json({success:false,error:"Invalid credentials"})
    
    return res.status(200).json({
        success:true,
        token:"eyeuhwiedhue",
        user
    });

    }catch(err) {
        next(err)
    }
}

exports.forgotPassword=async(req,res,next)=>{
    res.send("Forgot password")
}

exports.resetPassword=async(req,res,next)=>{
    res.send("Reset password")
}

