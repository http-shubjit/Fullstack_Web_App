// userController.js
const User = require("../models/user");


async function GetAllUser(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users", details: err.message });
  }
}


async function createUser(req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(400).json({ error: "Error creating user", details: err.message });
  }
}


async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user", details: err.message });
  }
}


async function updateUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User updated", user });
  } catch (err) {
    res.status(400).json({ error: "Error updating user", details: err.message });
  }
}


async function deleteUser(req, res) {
  const id = req.params.userId;

  try {
    const user = await User.findOneAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user", details: err.message });
  }
}

module.exports = {
  GetAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};