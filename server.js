const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static files (like your index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Admin login route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Editor route (after successful login)
app.get('/admin/editor', (req, res) => {
  res.sendFile(path.join(__dirname, 'editor.html'));
});

// Get the current HTML code (index.html) for editing
app.get('/admin/get-website-code', (req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.send(data);
  });
});

// Save the updated HTML code
app.post('/admin/save-website-code', (req, res) => {
  const newCode = req.body.html;
  
  fs.writeFile(path.join(__dirname, 'public', 'index.html'), newCode, 'utf8', (err) => {
    if (err) {
      res.status(500).send('Error saving file');
      return;
    }
    res.json({ message: 'File saved successfully!' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
