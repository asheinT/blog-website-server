const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const HttpError = require("../models/errorModel");

// ==================== REGISTER A NEW USER
// POST : api/users/register
// UNPROTECTED
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password) {
      return next(new HttpError("Fill in all fields.", 422));
    }

    const newEmail = email.toLowerCase();

    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("Email already exists.", 422));
    }
    if (password.trim().length < 6) {
      return next(
        new HttpError("Password should be at least 6 characters.", 422)
      );
    }
    if (password != password2) {
      return next(new HttpError("Password do not match.", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email: newEmail,
      password: hashedPass,
    });
    res.status(201).json(newUser);
  } catch (error) {
    return next(new HttpError("User registration failed.", 422));
  }
};

// ==================== LOGIN A REGISTERED USER
// POST : api/users/login
// UNPROTECTED
const loginUser = async (req, res, next) => {
  res.json("Login User");
};

// ==================== USER PROFILE
// POST : api/users/:id
// UNPROTECTED
const getUser = async (req, res, next) => {
  res.json("User Profile");
};

// ==================== CHANGE USER AVATAR
// POST : api/users/change-avatar
// UNPROTECTED
const changeAvatar = async (req, res, next) => {
  res.json("Change user avatar");
};

// ==================== EDIT USER DETAILS (from profile)
// POST : api/users/edit-user
// UNPROTECTED
const editUser = async (req, res, next) => {
  res.json("Edit user details");
};

// ==================== GET AUTHORS
// POST : api/users/authors
// UNPROTECTED
const getAuthors = async (req, res, next) => {
  res.json("Get all users/authors");
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
};
