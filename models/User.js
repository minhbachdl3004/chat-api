const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      min: 6,
      max: 50,
      unique: true,
    },
    username: {
      type: String,
      require: true,
      min: 6,
      max: 20,
      unique: true,
    },
    usernameCode: {
      type: Number,
      require: true,
      min: 4,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    avatar: {
      type: String,
      default: 'uploads/admin/default_avatar/images.png',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
