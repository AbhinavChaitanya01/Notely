const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');
const router = express.Router();


// ROUTE 1: get logged in user notes using : GET "/api/notes/fetchallnotes", login REQUIRED.
router.get("/fetchallnotes",fetchuser,async (req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})

// ROUTE 2: ADD a new note using : POST "/api/notes/addnote", login REQUIRED.
router.post("/addnote",fetchuser,[
    body('title').isLength({ min: 1}),
    body('description').isLength({ min: 3 }),
], async(req,res)=>{
    const {title, description, tag} = req.body;
    // if bad request return errors and bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }
    try{
        const note = new Note({
            title, description ,tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    }catch(error){
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})

// ROUTE 3: Updating an existing note using : PUT "/api/notes/updatenote/:id", login required.

router.put("/updatenote/:id",fetchuser,async (req,res)=>{
    const {title, description, tag} = req.body;
    const newNote = {};
    if(title){newNote.title= title};
    if(description){newNote.description= description};
    if(tag){newNote.tag= tag};
    let note = await Note.findById(req.params.id);
    // if such a note does not exist
    if(!note)return res.status(404).send("Not found");
    // if the user does not own that node but trying to access
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new: true});
    res.json({note});
})

// ROUTE 4: DELETE an existing note using : DELETE "/api/notes/deletenote/:id", login required.
router.delete("/deletenote/:id",fetchuser,async (req,res)=>{
    let note = await Note.findById(req.params.id);
    // if such a note does not exist
    if(!note)return res.status(404).send("Not found");
    // if the user does not own that node but trying to access
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({Success:"Note deleted"});
})


module.exports = router;