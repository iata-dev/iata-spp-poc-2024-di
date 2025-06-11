const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Route for the homepage
app.get('/b2c', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/B2C-VC-Issuer.html'));
});

// Route for the about page
app.get('/b2d', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/B2B-VC-Issuer.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});