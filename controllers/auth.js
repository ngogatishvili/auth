const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto=require('crypto')

exports.registerUser = async (req, res, next) => {
  const {username, email, password} = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user, res, 201);
  } catch (err) {
    return next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('please provide email and password', 400));
  }
  try {
    const user = await User.findOne({email}).select('+password');
    if (!user) return next(new ErrorResponse('Email not found', 404));
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));

    sendToken(user, res, 200);
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const {email} = req.body;
  if (!email) return next(new ErrorResponse('please provide email', 400));
  try {
    const user = await User.findOne({email});
    if (!user) return next(new ErrorResponse('email could not be sent', 404));
    const resetToken = user.getResetPasswordToken();
    await user.save();
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    
    const message = `
        <h1>you requested a password reset </h1>
        <p>Please follow this link to reset your password </p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    try{
        await sendEmail({to:user.email,text:message,subject:"Password reset request"})
        return res.status(200).json({success:true,data:"Email Sent"})
    }catch(err) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();
        return next(new ErrorResponse("Email could not be sent",500))
    }
  } catch (err) {
        return next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
    const {password}=req.body;
    const HashedPasswordToken=crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try{
        const user=await User.findOne({resetPasswordToken:HashedPasswordToken,resetPasswordExpire:{$gt:Date.now()}});
        if(!user) return next(new ErrorResponse("Invalid reset token",400))
        user.password=password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();
        return res.status(200).json({success:true,data:"Password updated successfully"})
    }catch(err) {
        return next(err)
    }
   

};

const sendToken = async (user, res, statusCode) => {
  const token = await user.getSignedToken();
  res.status(statusCode).json({success: true, token});
};
