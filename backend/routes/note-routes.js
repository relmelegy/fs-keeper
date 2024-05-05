const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/note');

const router = express.Router();

// GET
router.get('/', (req, res) => {
    Note.find()
        .exec()
        .then((results) => {
            console.log(results);
            res.status(200).json(results);
        })
        .catch((err) => {
            console.error('Error fetching notes:', err);
            res.status(500).json({ error: 'Failed to fetch notes' });
        });
});

// POST
router.post('/', (req, res) => {
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
    });
    note.save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: 'Note created',
                createdNote: result,
            });
        })
        .catch((err) => {
            console.error('Error creating note:', err);
            res.status(500).json({ error: 'Failed to create note' });
        });
});

// PATCH
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    Note.updateOne({ _id: id }, { $set: req.body })
        .exec()
        .then(result => {
            res.status(200).json({ message: 'Note updated successfully', result });
        })
        .catch((err) => {
            console.error('Error updating note:', err);
            res.status(500).json({ error: 'Failed to update note' });
        });
});

// DELETE
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Note.deleteOne({ _id: id })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json({ message: 'Note deleted successfully', result });
        })
        .catch((err) => {
            console.error('Error deleting note:', err);
            res.status(500).json({ error: 'Failed to delete note' });
        });
});

module.exports = router;