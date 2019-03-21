const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const featureFlag = process.env.flag || false;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});
app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});
app.post("/api/killme", (req, res) => {
  if (featureFlag) {
    res.status(200);
    res.send("Hey you didn't break me this time!");
  } else {
    res.status(500);
    res.send("Whoops - You killed the server :(");
    process.exit(1);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
