require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/error-handler");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use("/users", require("./users/user.controller"));

// Global error handler
app.use(errorHandler);

// Start the server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => console.log("Server listening on port " + port));
