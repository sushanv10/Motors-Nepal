const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

   role:{
        type: String,
        enum:['admin', 'user'],
        default: "user",  

    },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10); //salt check how many time password has been bcrypt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('authUser', userSchema);

module.exports = User;