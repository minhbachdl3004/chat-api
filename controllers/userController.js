const User = require("../models/User");

const userController = {
  // GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      const userWithoutPassword = user.map((user) => {
        const { password, ...others} = user._doc
        return {...others}
      })
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET USER BY NAME
  getUserByName: async (req, res) => {
    console.log(req.query.name)
    try {
      const user = await User.find({ fullname: req.query.name });
      if (!user) {
        res.status(404).json("User not found!");
        return;
      }
      res.status(200).json(user);
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
};

module.exports = userController;
