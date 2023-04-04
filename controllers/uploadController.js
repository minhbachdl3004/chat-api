const express = require("express");
const User = require("../models/User");
const authController = require("./authController");
const fs = require("fs");

const uploadAvatar = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(req.body);
    const user = await User.findByIdAndUpdate(userId, {
      avatar: req.file.path,
    });
    const userUpdatedAvatar = await User.findById(userId);
    if (!user) {
      res.status(404).json("User not found!");
      return;
    }
    // Delete the old avatar file if it exists
    if (user.avatar && user.avatar !== 'uploads/admin/default_avatar/images.png') {
      const oldAvatarPath = `./${user.avatar}`;
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }
    const newUser = await userUpdatedAvatar.save();
    const accessToken = authController.generateAccessToken(newUser);

    res.status(200).json({
      accessToken,
      updateProfile: {
        _id: newUser._id,
        username: newUser.username,
        usernameCode: newUser.usernameCode,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  uploadAvatar,
};
