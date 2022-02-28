const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const privateKey = "ThisIsThePrivateKey";
const fetchUser = require('../middleware/fetchUser')

router.post(
    "/",
    fetchUser,
    async (req, res) => {
      try {
        let User = require("../models/User");
        let userId = id;
        User = await User.findById(userId).select("-password")
        if(!User){
            return res.status(400).json({error:"Authentication error",success:false})
        }
        res.send({User,success:true})
    
    } catch (error) {
        console.log(error.message)
      res.status(500).json({ error: "some internal server error occured" });
    }
    }
  );
  
  module.exports = router;
  