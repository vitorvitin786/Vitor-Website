const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (like CSS and images)

// Static files (like CSS and images)
app.use('/static', express.static(path.join(__dirname, 'public')));

// Serve the main page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin Login Route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Admin Login Post Route
app.post('/admin/login', (req, res) => {
  const passcode = req.body.passcode;
  if (passcode === '201109') {
    res.redirect('/admin/editor');
  } else {
    res.send('Incorrect passcode');
  }
});

// Editor Page (Only accessible after login)
app.get('/admin/editor', (req, res) => {
  res.sendFile(path.join(__dirname, 'editor.html'));
});

// Save Changes (Editor Post Route)
app.post('/admin/save', (req, res) => {
  const newHtmlContent = req.body.htmlContent;

  // Write new HTML content to the index.html file
  fs.writeFile(path.join(__dirname, 'index.html'), newHtmlContent, (err) => {
    if (err) {
      return res.send('Error saving file');
    }
    res.send('File saved successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
