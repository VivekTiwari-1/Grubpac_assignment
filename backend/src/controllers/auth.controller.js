const authService = require("../services/auth.service");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  maxAge: 604800000, // 7 days in ms,
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await authService.register({ name, email, password });
    res.status(201).json({ message: "Registration successful", user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const { user, accessToken } = await authService.login({ email, password });

    res.cookie("accessToken", accessToken, COOKIE_OPTIONS);
    res.json({ message: "Login successful", user });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  res.clearCookie("accessToken", COOKIE_OPTIONS);
  res.json({ message: "Logged out successfully" });
};

const getMe = async (req, res) => {
  res.json({ user: req.user });
};

module.exports = { register, login, logout, getMe };
