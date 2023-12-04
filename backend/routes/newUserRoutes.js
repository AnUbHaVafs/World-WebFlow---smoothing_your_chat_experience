const express = require("express");
const { LoginNewUser } = require("../controllers/newUserController");

const router = express.Router();

router.route("/google-login").post(LoginNewUser);

module.exports = router;
