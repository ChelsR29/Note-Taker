const express = require('express');
const htmlRoutes = require('./routes/html-routes.js'); // Import HTML routes
const apiRoutes = require('./routes/api-routes.js'); // Import API routes

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(htmlRoutes); // Set up HTML routes
app.use(apiRoutes); // Set up API routes

app.use(express.static('public')); // Serve static files from the 'public' folder

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
