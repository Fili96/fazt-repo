const notesController = {}

const Note = require('../models/Note');

notesController.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
}

notesController.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.send({note});
}

notesController.createNote = async (req, res) => {
  const { title, content, author } = req.body;
  const newNote = new Note({
    title,
    content,
    author
  });
  await newNote.save()
  res.json({message: "Note saved"});
}

notesController.updateNote = async (req, res) => {
  const { title, content, author } = req.body;
  await Note.findOneAndUpdate(req.params.id, {
    title,
    content,
    author
  });
  res.json({message: "Note updated"})
}

notesController.deleteNote = async (req, res) => {
  await Note.findOneAndDelete(req.params.id)
  res.json({message: "Note deleted"})
}

module.exports = notesController;
