const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone:{
    type:Number,
    required:true
  }
});

const users = mongoose.model('users', userSchema);

module.exports = users;
