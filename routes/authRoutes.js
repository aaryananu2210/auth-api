const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { signup ,login,getProfile} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);

module.exports = router;