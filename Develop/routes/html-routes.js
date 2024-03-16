const path = require('path');

module.exports = function (app) {
  // Route to serve the index.html file
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // Route to serve the notes.html file
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });
};
