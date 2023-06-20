const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// Generate JWT
// JWT_SECRET = 'flipr-webdev'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, role, dept, contact, join_date, password } = req.body;
  if (
    !name ||
    !email ||
    !role ||
    !dept ||
    !contact ||
    !join_date ||
    !password
  ) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  // check if user exits
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    role,
    dept,
    contact,
    join_date,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      dept: user.dept,
      contact: user.contact,
      join_date: user.join_date,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      dept: user.dept,
      contact: user.contact,
      join_date: user.join_date,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get Employee data
// @route   GET /api/users/employees
// @access  Admin

const getEmployees = asyncHandler(async (req, res) => {
  const employees = await User.find({ role: "Employee" });
  res.status(200).json(employees);
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private

const getUser = asyncHandler(async (req, res) => {
  // const { _id, name, email } = await User.findById(req.user.id)
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getEmployees,
};
