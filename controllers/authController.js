const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");


const signup = asyncHandler(async (req, res) => {

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

});


const login= asyncHandler(async(req, res,next)=> {
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
  {
    userId: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

    res.json({
      message: "Login successful",
      token
    });

});


function getProfile(req, res) {
  res.json({
    message: "Protected profile accessed",
    user: req.user
  });
}

const uploadProfile = (req, res) => {

    console.log(req.file);

    res.json({
        message: "Profile uploaded successfully"
    });

};

module.exports = {
  signup,
  login,
  getProfile,
  uploadProfile
};