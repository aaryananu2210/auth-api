const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function signup(req, res,next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword
    });

    res.json({
      message: "User created successfully",
      email: newUser.email
    });

  } catch (error) {
    next(error);
  }
}

async function login(req, res,next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    next(error);
  }
}

function getProfile(req, res) {
  res.json({
    message: "Protected profile accessed",
    user: req.user
  });
}

module.exports = {
  signup,
  login,
  getProfile
};