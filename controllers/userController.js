const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const kycModel = require("../models/kycModel");
const postModel = require("../models/postModel");
exports.createUser = async (req, res, next) => {
  const { email, password, ...others } = req.body;
  if (!email || !password) {
    return res.send("Email and password required");
  }
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return res.send("User alrealdy exist");
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const user = await userModel.create({
      email,
      password: hashedPassword,
      ...others,
    });
    return res.status(201).json({ sucess: true, user });
  } catch (error) {
    res.send(error.message);
  }
};
exports.getOneUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await userModel
      .findById(id)
      .select("-password")
      .populate("posts")
      .populate("kyc");
    return res.status(200).json({ sucess: true, user });
  } catch (error) {
    return res.send(error.message);
  }
};
exports.getUsers = async (req, res, next) => {
  try {
    const user = await userModel.find().select("-password");
    return res.status(200).json({ sucess: true, user });
  } catch (error) {
    return res.send(error.message);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (req.body.password) {
      return res.send("you cannot update password");
    }
    if (!user) {
      return res.send("User Not found");
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    return res.json({ sucess: true, updatedUser });
  } catch (error) {
    return res.send(error.message);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.findByIdAndDelete(id);
    await kycModel.findOneAndDelete({ user: req.user.id });
    await postModel.deleteMany({ creator: req.user.id });
    return res.json({ success: true });
  } catch (error) {
    return res.send(error.message);
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    user = await userModel.findOne({ email });
    if (!user) {
      return res.send("User doesnt exist please Sign up");
    }
    comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.send("Please provide a valid password");
    }
    const token = jwt.sign(
      { id: user.id, admin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60,
      secure: true,
      httpOnly: true,
    });
    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.send(error.message);
  }
};
