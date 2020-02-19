const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const user = require("./src/user/router-user");
const room = require("./src/rooms/router-rooms");
const { streamRouter, stream } = require("./src/stream/router");

const app = express();
const parserMiddleware = bodyParser.json();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(parserMiddleware);

app.use(user);
app.use(room(stream));
app.use(streamRouter);

app.get("/test", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
