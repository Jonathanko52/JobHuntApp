const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 3000;
const taskController = require("./taskController.js");
const authController = require("./authController.js");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/assets", express.static(__dirname + "./../../dist"));

app.get(
  "/",
  (req, res, next) => {
    res.sendFile(path.join(__dirname, "./../../dist/index.html"));
    next();
  },
  authController.googleAuth
);

app.get("/RetrieveHtmlLinkedIn/:link", taskController.retrieveHtmlLinkedIn);

app.get("/RetrieveHtmlIndeed/:link", taskController.retrieveHtmlIndeed);

app.get("/RetrieveHtmlBuiltInLA/:link", taskController.retrieveHtmlBuildInLA);

app.get("/RetrieveHtmlAngelist/:link", taskController.retrieveHtmlAngelist);
app.get("/TEST", authController.googleAuth);

app.listen(port, () => {
  console.log(`Listening on ${port}, http://localhost:3000/`);
});
