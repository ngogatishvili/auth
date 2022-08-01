const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

const User = mongoose.model('User', UserSchema);

module.exports = User;
