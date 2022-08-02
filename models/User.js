const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto=require('crypto')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
  },
  email: {
    type: String,
    required: [true, 'please provide email'],
    unique: [true, 'the email address already in use'],
    // match:[/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/,"please provide valid E-mail"]
  },
  password: {
    type: String,
    required: [true, 'please provide password'],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    console.log('ariiiiiis');
    next();
  }

  console.log('oh no');

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


UserSchema.methods.comparePassword=async function(password) {
        return await bcrypt.compare(password,this.password)
}


UserSchema.methods.getSignedToken=async function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
    
}

UserSchema.methods.getResetPasswordToken= function() {
    const resetToken=crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+(10*(60*1000));
    return resetToken;
}


const User = mongoose.model('User', UserSchema);

module.exports = User;
