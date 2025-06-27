const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  hobbies: {
    type: [String],
  },
  kyc: {
    type: mongoose.Types.ObjectId,
    ref: "Kyc",
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  books: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Book",
    },
  ],
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
