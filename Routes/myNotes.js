const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");

router.get(
  "/",
  fetchUser,
  async (req, res) => {
    try {
        let userId = id;
        let myNotes = await Notes.find({user: userId}).select("-user")
        if(!myNotes){
            console.log(userId);
            return res.status(400).json({error:"Empty"})
        }
        res.json(myNotes)
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "some internal server error occured" });
    }
  }
);

module.exports = router;