const express = require("express");
const voterRouter = express.Router();
const {
  voterSingup,
  voterLogin,
  voterProfile,
  voterPasswordChange,
} = require("./../controllers/voterController.js");

voterRouter.post("/signup", voterSingup);
voterRouter.post("/login", voterLogin);
voterRouter.post("/profile", voterProfile);
voterRouter.put("/profile/password/:id", voterPasswordChange);

module.exports = voterRouter;
