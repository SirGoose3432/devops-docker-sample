const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const featureFlag = process.env.flag || false;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/killme", (req, res) => {
  if (featureFlag) {
    res.status(200);
    res.send("Hey you didn't break the server this time!");
  } else {
    res.status(505);
    res.send("Whoops - You killed the server :(");
    process.exit(1);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
