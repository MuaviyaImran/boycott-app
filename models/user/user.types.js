const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  profilePic: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String },
  createdAt: { type: Date },
});

const User = model("User", userSchema);

module.exports = User;
