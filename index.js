const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const user = require("./src/user/router-user");
const bodyParser = require("body-parser");

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

app.use(user);

app.get("/test", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
