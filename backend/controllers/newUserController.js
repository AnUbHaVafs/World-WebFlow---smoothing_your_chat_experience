const NewUser = require("../models/newUserModel");
const generateToken = require("../config/generateToken");
const expressAsyncHandler = require("express-async-handler");

const LoginNewUser = expressAsyncHandler(async (req, res) => {
  // console.log("API called!", req.body);
  if (Boolean(req.body.isEmailVerified)) {
    if (!Boolean(req.body.email)) {
      res.status(400);
      throw new Error("Email required here!");
    }
    // console.log("here");
    const userExists = await NewUser.findOne({ email: req.body.email });
    if (userExists) {
      // console.log("userExists", userExists);
      res.status(201).json({
        _id: userExists._id,
        email: userExists.email,
        isEmailVerified: userExists.isEmailVerified,
        token: generateToken(userExists._id),
      });
    } else {
      // console.log("user don't Exists, creating one!");
      const user = await NewUser.create({
        email: req.body.email,
        isEmailVerified: req.body.isEmailVerified,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: "Created",
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          pic: user.pic,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("User not created successfully!");
      }
    }
  }
});

module.exports = { LoginNewUser };
