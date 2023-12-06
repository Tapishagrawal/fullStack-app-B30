const express = require('express');
const { auth } = require('../middlewares/auth.middleware');
const { NoteModel } = require('../models/notes.model');

const notesRouter = express.Router();

notesRouter.use(auth);

notesRouter.post("/create", async (req, res) => {
    try {
        const newNote = new NoteModel(req.body);
        await newNote.save();
        res.status(200).send({ "msg": "A new note has been added." })
    } catch (error) {
        res.status(400).send({ "error": error })
    }
});

notesRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find({ userID: req.body.userID });
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({ "error": error })
    }
});

notesRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const note = await NoteModel.findOne({ _id: id });
        if (req.body.userID === note.userID) {
            await NoteModel.findByIdAndUpdate({ _id: id }, req.body)
            res.status(200).send({ "msg": `note with ID:${id} has been updated` });
        }
    } catch (error) {
        res.status(400).send({ "error": error })
    }
});

notesRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const note = await NoteModel.findOne({ _id: id })
        if (req.body.userID === note.userID) {
            await NoteModel.findByIdAndDelete({ _id: id })
            res.status(200).send({ "msg": `note with ID:${id} has been deleted` });
        } else {
            res.status(200).send({ "mag": "Your are not authorized." });
        }
    } catch (error) {
        res.status(400).send({ "error": error });
    }
})

module.exports = { notesRouter }