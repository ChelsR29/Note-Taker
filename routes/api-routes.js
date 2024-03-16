const express = require('express');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid')

const router = express.Router();

// GET route to fetch all notes
router.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => {
    const notes = JSON.parse(data).map(note => ({
      id: note.note_id, // Assuming the note has a unique ID named note_id
      title: note.title,
      text: note.text
    }));
    res.json(notes);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Server Error');
  });
});

// POST route to save a new note
router.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.note_id = uuid(); // Add a unique ID to the new note
  readAndAppend(newNote, './db/db.json').then(() => {
    const savedNote = {
      id: newNote.note_id, // Return the newly generated ID
      title: newNote.title,
      text: newNote.text
    };
    res.status(201).json(savedNote); // Send the saved note as JSON response
  }).catch(err => {
    console.error(err);
    res.status(500).send('Server Error');
  });
});

// Route to delete a note by ID
router.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  readFromFile('./db/db.json').then((data) => {
    const notes = JSON.parse(data);
    const filteredNotes = notes.filter((note) => note.note_id !== id); // Filter out the note with the specified ID
    const updatedData = JSON.stringify(filteredNotes, null, 2);
    fs.writeFile('./db/db.json', updatedData, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server Error');
      } else {
        res.send('Note deleted successfully');
      }
    });
  }).catch(err => {
    console.error(err);
    res.status(500).send('Server Error');
  });
});


module.exports = router;
