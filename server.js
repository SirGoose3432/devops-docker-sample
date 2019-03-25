const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 5000;
const featureFlag = process.env.flag || false;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/killme", (req, res) => {
  console.log("Received a request", req);
  if (featureFlag) {
    res.status(200);
    res.send("Hey you didn't break the server this time!");
  } else {
    res.status(505);
    res.send("Whoops - You killed the server :(");
    //process.exit(1);
  }
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
