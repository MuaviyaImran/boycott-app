import bcrypt from "bcrypt";
import { Schema } from "mongoose";
import validator from "validator";
import { comparePassword, findOneOrCreate } from "./user.methods";
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Account already exists"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your email"],
    minLength: [6, "Your password must be at least 6 characters long"],
    select: false,
  },
  role: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.findOneOrCreate = findOneOrCreate;
userSchema.methods.comparePassword = comparePassword;

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default userSchema;
