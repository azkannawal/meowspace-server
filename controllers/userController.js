const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = {};
    errors.array().forEach((err) => (errorMsg[err.param] = err.msg));
    return res.status(400).json({ message: errorMsg });
  }

  const { fullName, email, password } = req.body;
  try {
    const user = await User.create({ fullName, email, password });
    res
      .status(201)
      .json({
        message: "User created",
        user: { fullName: user.fullName, email: user.email },
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = {};
    errors.array().forEach((err) => (errorMsg[err.param] = err.msg));
    return res.status(400).json({ message: errorMsg });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "100h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.validateEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.json({ isUnique: false, user });
    }
    res.json({ isUnique: true });
  } catch (err) {
    res.status(500).json({ message: "Validation error", error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ["id", "fullName", "email"],
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Get profile failed", error: err.message });
  }
};
