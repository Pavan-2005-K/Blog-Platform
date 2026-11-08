
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters"
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered"
      });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};

// Get Logged-in User Profile
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch profile"
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile
};
