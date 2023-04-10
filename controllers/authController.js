const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const existedAccount = await User.findOne({ email: req.body.email })
      if (existedAccount) {
        return res
          .status(409)
          .send({ error: "Email existed" });
      }

      //Create new user
      const newUser = await new User({
        email: req.body.email,
        username: req.body.username,
        usernameCode: req.body.usernameCode,
        password: hashed,
      });

      //Save user to DB
      const user = await newUser.save();
      const accessToken = authController.generateAccessToken(user);
      res.status(200).json({ accessToken });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        usernameCode: user.usernameCode,
        avatar: user.avatar,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );
  },

  //LOGIN
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      console.log(user);
      if (!user) {
        res.status(404).json("Email or password is invalid");
        return;
      }
      const validPassword = await bcrypt.compare(
        password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("Email or password is invalid");
        return;
      }
      if (user && validPassword) {
        //Generate access token
        const accessToken = authController.generateAccessToken(user);
        const { password, ...others } = user._doc;
        res.status(200).json({ accessToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = authController;
