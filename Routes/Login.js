const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const privateKey = "ThisIsThePrivateKey";

router.post(
  "/",
  [body("email", "Email must be Valid").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),success:false });
    }
    try {
    let User = require("../models/User");
    User = await User.findOne({ email: req.body.email });
    if (!User) {
      return res
        .status(400)
        .json({ error: "Please provide correct credentials" ,success:false });
    }
    let pass = bcrypt.compareSync(req.body.password, User.password);
    if (!pass) {
      return res
        .status(400)
        .json({ error: "Please provide correct credentials",success:false });
    }
    let data = {
      id: User.id,
    };
    let authToken = jwt.sign(data, privateKey);
    res.json({ authToken , success:true});
  } catch (error) {
    res.status(500).json({ error: "some internal server error occured",success:false });
  }
  }
);

module.exports = router;
