const bcrypt = require("bcryptjs");

const User = require("../models/User");

// Get profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password"
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    if (req.body.email) {
      const emailExists = await User.findOne({
        email: req.body.email.toLowerCase(),
        _id: { $ne: user._id },
      });

      if (emailExists) {
        return res.status(400).json({
          message: "Email already in use",
        });
      }

      user.email = req.body.email.toLowerCase();
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(
        req.body.password,
        salt
      );
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - get single user
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getUsers,
  getUserById,
  deleteUser,
};