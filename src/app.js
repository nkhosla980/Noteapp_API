const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./config/db.config.js"); // Ensure the database is connected
const ip = require("ip");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// Middleware
//app.use(express.json());
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(morgan("combined"));

// Import routes
const usersRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const preferencesRoutes = require("./routes/preferencesRoutes");

// Use routes
app.use("/users", usersRoutes);
app.use("/notes", notesRoutes);
app.use("/preferences", preferencesRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  //res.send("Welcome to NoteApp API");
  next();
});

const serverIP = ip.address();
const PORT = process.env.PORT || 5000;
app.listen(PORT, serverIP, () => {
  console.log(`API URL: http://${serverIP}:${PORT}`);
});

module.exports = app;
