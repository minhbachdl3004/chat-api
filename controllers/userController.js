const { ObjectId } = require("mongodb");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const authController = require("./authController");

const userController = {
  // GET ALL USERS WITH PAGINATION
  getAllUsers: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = 10;

      // Get the total number of users
      const totalUsers = await User.countDocuments();

      // Get the users for the current page
      const allUsers = await User.find()
        .skip((page - 1) * perPage)
        .limit(perPage);

      const users = allUsers.map((user) => {
        const { password, ...others } = user._doc;
        return { ...others };
      });
      
      res.status(200).json({
        users,
        pagination: {
          page,
          perPage,
          totalPages: Math.ceil(totalUsers / perPage),
          totalUsers,
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET USER BY USERNAME AND USERID
  getUserByUsername: async (req, res) => {
    try {
      const user = await User.findOne({
        username: req.query.username,
        usernameCode: req.query.usernameCode,
      });
      if (!user) {
        res.status(404).json("User not found!");
        return;
      }
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET USER BY USERID
  getUserByUserID: async (req, res) => {
    const { userId } = req.query;
    try {
      const user = await User.findById(userId)
      if (!user) {
        res.status(404).json("User not found!");
        return;
      }
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const { newUsername, newPassword, currentPassword } = req.body;
      const { id } = req.params;
      console.log(id, newUsername, currentPassword);
      const user = await User.findById(id);

      const validPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!validPassword) {
        res.status(400).json({name: "Current Password", msg: "Password does not match."});
        return;
      }

      if (newUsername) {
        if (newUsername.length < 2) {
          res.status(400).json({name: "username", msg: "Must be between 2 and 32 in length."});
          return;
        }
        user.username = newUsername;
      }

      if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
      }

      await user.save();

      const accessToken = authController.generateAccessToken(user);

      res.status(200).json({ accessToken, updateProfile: {
        _id: user._id,
        username: user.username,
        usernameCode: user.usernameCode,
        avatar: user.avatar,
      }, });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE USER
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json("Success delete user");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // PROMOTE TO ADMIN
  promoteToAdmin: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json(err);
        return;
      }
      if (user) {
        user.admin = true;
        await user.save();
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Update Avatar
  updateAvatar: async (req, res) => {
    try {
    } catch (error) {
      
    }
  }
};

module.exports = userController;
