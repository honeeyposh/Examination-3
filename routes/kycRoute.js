const express = require("express");
const {
  createKyc,
  getkyc,
  deleteKyc,
  updateKyc,
} = require("../controllers/kycController");
const authentication = require("../middlewares/authMiddleware");
const route = express.Router();
route.post("/kyc", authentication, createKyc);
route.get("/kyc/:kycId", authentication, getkyc);
route.delete("/kyc/:kycId", authentication, deleteKyc);
route.put("/kyc/:kycId", authentication, updateKyc);
module.exports = route;
