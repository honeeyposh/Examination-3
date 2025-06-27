const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  login,
  getOneUser,
} = require("../controllers/userController");
const authentication = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/createuser", createUser);
router.post("/login", login);
router.get("/getuser", authentication, getOneUser);
router.get("/getusers", getUsers);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser", authentication, deleteUser);
module.exports = router;
