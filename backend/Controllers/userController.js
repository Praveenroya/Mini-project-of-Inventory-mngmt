const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  try {
    User.findAll(async (err, users) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
      } else {
        res.status(200).json({
            success: true,
            message: "Users has successfully retrive",
            data: users,
          });
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    User.findById(id, async (err, user) => {
    
      res.status(200).json({
        success: true,
        data: user,
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    User.update(id, body, async (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    try {
      User.delete(id, async (err, user) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }
  
        res.status(200).json({
          success: true,
          data: user,
        });
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

  exports.getUserByRole = (req, res) => {
    const { role} = req.body;
    try {
      User.findByRole(role, async (err, user) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }
  
        res.status(200).json({
          success: true,
          data: user,
        });
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  