const fs = require('fs');
const path = require('path');

module.exports = function (app) {
  // Route to get all notes
  app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(JSON.parse(data));
    });
  });

  // Route to create a new note
  app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      const notes = JSON.parse(data);
      const newNote = req.body;
      newNote.id = notes.length + 1; // Assign a unique ID

      notes.push(newNote);

      fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.json(newNote);
      });
    });
  });
};
