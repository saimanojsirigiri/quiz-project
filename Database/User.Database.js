const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user = new schema({
  fullName: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  profilePhotoUrl: {
    type: String,
  },
  userRole: {
    type: String,
  },
  userName: {
    type: String,
    unique: true,
  },
  doB: {
    type: Date,
  },
});

const User = mongoose.model("users", user);

module.exports = User;
