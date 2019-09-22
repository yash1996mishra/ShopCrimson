const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userId: String,
  userPassword: String,
  userName: String,
  companyName: String
  
});

module.exports = userSchema;