const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timeStamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;