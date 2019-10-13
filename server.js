const express = require('express');
const path = require('path');
const app = express();

// Serve static files from React
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});