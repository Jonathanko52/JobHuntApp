const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 8800;
const taskController = require("./taskController.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/assets", express.static(__dirname + "./../../dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./../../dist/index.html"));
});

app.get("/RetrieveHtml/:link", taskController.retrieveHtml);

//paths

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
