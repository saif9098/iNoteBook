const express = require('express')
const FetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const router = express.Router();
const { body, validationResult } = require('express-validator')

//Route 1 get all the notes using : get"/api.notes/fetchallnotes" >login required
router.get('/fetchallnotes', FetchUser, async (req, resp) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        resp.json(notes)
    } catch (error) {
        console.error(error.message);
        resp.status(500).send("internal server error")

    }

});

//Route -2 add a new note using post"api/notes/addnote" >login required
router.post('/addnote', FetchUser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'discription must be atleast 5 characters').isLength({ min: 5 })
], async (req, resp) => {
    try {
        const { title, description, tag } = req.body
        //if there are errors,return bad request and error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        resp.json(savedNote)
    } catch (error) {
        console.error(error.message);
        resp.status(500).send("internal server error")

    }
});

//Route -3 update a existing note using put"api/notes/updatenote" >login required
router.put('/updatenote/:id',FetchUser,async (req,resp)=>{
   try {
    const {title,description,tag}= req.body;
    // create a new note object
    const newnote ={};
    if(title){newnote.title=title}
    if(description){newnote.description=description}
    if(tag){newnote.tag=tag}
    
  //find the note to be updated and update it 
  let note = await Notes.findById(req.params.id);
  if(!note){return resp.status(404).send("user note found")}
  if(note.user.toString()!==req.user.id){
    return resp.status(401).send("Not allowed")
  }
  note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new :true})
  resp.json(note);
    
   } catch (error) {
    console.error(error.message);
        resp.status(500).send("internal server error")
   }
})

//Route -4 delete a existing note using post"api/notes/deletenote" >login required
router.delete('/deletenote/:id',FetchUser,async (req,resp)=>{

 try {
     //find the note to be deleted and delete it 
  let note = await Notes.findById(req.params.id);
  if(!note){return resp.status(404).send("user note found")}
  //allow deletion only if user owns this note
  if(note.user.toString()!==req.user.id){
    return resp.status(401).send("Not allowed")
  }
  note = await Notes.findByIdAndDelete(req.params.id)
  resp.json({"success":"note has been deleted",note:note});
 } catch (error) {
    console.error(error.message);
        resp.status(500).send("internal server error")
 }
 
})


module.exports = router