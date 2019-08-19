const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/assets", express.static(__dirname + "./../../assets"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./../../assets/login.html"));
});

//paths

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
