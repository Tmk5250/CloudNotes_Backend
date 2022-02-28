const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");


// Adding notes 
router.post(
  "/",
  fetchUser,
  [
    body("title", "Title must be minimum 5 characters").isLength({
      min: 5,
    }),
    body("description", "description must be minimum 5 characters").isLength({
      min: 5,
    }),
  ],
 
  async ( req, res) => {
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let userId=id;
    const { title, description, tag } = req.body;
      let notes = await Notes.create({
        user:userId,
        title,
        description,
        tag,
      });
      res.json({ notes });
    } catch (error) {
      res.status(500).json({ error: "some internal server error occured" });
      console.log(error.message)
    }
  }
);



// Updating notes 
router.put(
  "/:id",
  fetchUser,
  async (req, res) => {
    // try {
    let userId = id
    const { title, description, tag } = req.body;
    let upNotes ={}
    if(title){upNotes.title = title};
    if(description){upNotes.description = description};
    if(tag){upNotes.tag = tag};
    let note = await Notes.findById(req.params.id);
    if(!note){
      return res.status(401).send('Note not found');
    }
    if(note.user.toString() !== userId){
      return res.status(401).send('Invalid entry');
    }

    let notes = await Notes.findByIdAndUpdate(req.params.id ,{$set :upNotes},{new:true});
    res.json(notes)
    // } catch (error) {
    //   console.error(error.message);
    //   res.status(500).json({ error: "some internal server error occured" });
    // }
  }
);
// Deleting  notes 
router.delete(
  "/:id",
  fetchUser,
  async (req, res) => {
    try {
    let userId = id
    let note = await Notes.findById(req.params.id);
    if(!note){
      return res.status(401).send('Note not found');
    }
    if(note.user.toString() !== userId){
      return res.status(401).send('Invalid entry');
    }
    let notes = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Succes: "Note deleted succesfully "+notes })
    } catch (error) {
      res.status(500).json({ error: "some internal server error occured" });
    }
  }
);
module.exports = router;
