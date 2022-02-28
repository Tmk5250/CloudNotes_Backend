const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const privateKey = 'ThisIsThePrivateKey'


router.get("/", (req, res) => {
  res.send("in signUp.js");
});

router.post(
  "/",
  [
    body("email", "Email must be Valid").isEmail(),
    body("password", "Password must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),success:false });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(402).json({ error: "email already  exist", success:false });
      }
      //saving password as a hash with salt for extra security
      let salt = bcrypt.genSaltSync(11)
      let SecPassword = bcrypt.hashSync(req.body.password , salt)
      // Use async await for mongoose methods as it returns queries which make easy to handle rather than using .then
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecPassword,
      });
     let data={
         id:user.id
     }
      let authToken = jwt.sign(data, privateKey);
      res.json({authToken ,success:true});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "some internal server error occured", success:false });
    }
  }
);

module.exports = router;
