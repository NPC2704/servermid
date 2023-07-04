// import * as controller from "../controller";
const controller = require("../controllers");
const express = require("express");
// import express from "express";
const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", (req, res) => {
  res.status(200).json("Logout successful");
});
module.exports = router;
