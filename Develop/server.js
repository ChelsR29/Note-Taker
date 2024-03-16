const express = require('express');
const htmlRoutes = require('./routes/html-routes'); // Import HTML routes
const apiRoutes = require('./routes/api-routes'); // Import API routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public')); // Serve static files from the 'public' folder

htmlRoutes(app); // Set up HTML routes
apiRoutes(app); // Set up API routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
