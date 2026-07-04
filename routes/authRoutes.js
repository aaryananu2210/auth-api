const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { signup ,login,getProfile} = require("../controllers/authController");
const { body } = require("express-validator");
const validate = require("../middleware/validationMiddleware");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
  ],
  validate,
  signup
);

router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);

module.exports = router;