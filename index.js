const express = require("express");
const path = require("path");

const app = express();
const port = 9000;

// Serve static files from the 'build' directory (React's build folder)
app.use(express.static(path.join(__dirname, "build")));

// Catch-all route to serve 'index.html' for any non-API request (like React routing)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
    console.log(`React app started on http://localhost:${port}`);
});
