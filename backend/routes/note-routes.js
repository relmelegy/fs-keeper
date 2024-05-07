const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/note');
const verifyToken = require('./authMiddleware');

const router = express.Router();

// GET notes for authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const userNotes = await Note.find({ userId: req.uid });
    res.status(200).json(userNotes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Error fetching notes' });
  }
});

// POST a new note for authenticated user
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const newNote = new Note({
      _id: new mongoose.Types.ObjectId(),
      title,
      content,
      userId: req.uid
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Error creating note' });
  }
});

// PATCH a note for authenticated user
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.uid },
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found or not owned by the user' });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Error updating note' });
  }
});

// DELETE a note for authenticated user
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId: req.uid });
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found or not owned by the user' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Error deleting note' });
  }
});

module.exports = router;
