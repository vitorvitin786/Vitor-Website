const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

// Use body parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Serve the current HTML content (index.html)
app.get("/", (req, res) => {
  fs.readFile("index.html", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading the index.html file.");
    } else {
      res.send(data);
    }
  });
});

// Admin login page to input the secret code
app.get("/admin", (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>Admin Login</h2>
        <form action="/admin" method="POST">
          <label for="code">Enter Code: </label>
          <input type="text" id="code" name="code">
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

// Handle admin login and show the HTML editor if the code is correct
app.post("/admin", (req, res) => {
  const { code } = req.body;

  if (code === "201109") {
    // Show the HTML editor page
    fs.readFile("index.html", "utf-8", (err, data) => {
      if (err) {
        res.status(500).send("Error reading the index.html file.");
      } else {
        res.send(`
          <html>
            <body>
              <h2>Admin Panel</h2>
              <form action="/save" method="POST">
                <textarea name="htmlCode" rows="20" cols="100">${data}</textarea><br><br>
                <input type="submit" value="Save Changes">
              </form>
            </body>
          </html>
        `);
      }
    });
  } else {
    res.send("Invalid Code.");
  }
});

// Save the updated HTML content when the admin submits the form
app.post("/save", (req, res) => {
  const { htmlCode } = req.body;

  fs.writeFile("index.html", htmlCode, "utf-8", (err) => {
    if (err) {
      res.status(500).send("Error saving the HTML file.");
    } else {
      res.send("Website updated successfully! <a href='/'>Go to website</a>");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});