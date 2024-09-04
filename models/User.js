const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique:true,
    },
    password: {
      type: String,
      require: true,
    },
    profileImage: {
      type: String,
    },
    isDelete: {
      type: Boolean,
      default: false
    },
  },
  {
    versionKey: false,
    timestamps: true,
  });

module.exports = mongoose.model('users', UserSchema)

