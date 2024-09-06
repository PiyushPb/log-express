const express = require("express");
const logger = require("./src/log-express");

const app = express();

// Example options to control logging behavior
const loggerOptions = {
  logLevel: "debug", // Adjust log level: trace, debug, info, warn, error, fatal
  consoleLog: true, // Set to false to disable console logging
  saveLogs: true, // Set to true to enable file logging
  logPerDay: true, // Set to true to enable logging per day (e.g., logs/system-2024-09-05.logs)
};

// Use the log-express middleware with the specified options
app.use(logger(loggerOptions));

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

app.get("/about", (req, res) => {
  res.send("About us page");
});

app.get("/services", (req, res) => {
  res.send("Our services");
});

app.post("/contact", (req, res) => {
  res.send("Contact us form submitted");
});

app.put("/update", (req, res) => {
  res.send("Update endpoint");
});

app.delete("/delete", (req, res) => {
  res.send("Delete endpoint");
});

// Define a route with a URL parameter
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User profile for user ${userId}`);
});

// Define a route with query parameters
app.get("/search", (req, res) => {
  const query = req.query.q;
  res.send(`Search results for query: ${query}`);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
