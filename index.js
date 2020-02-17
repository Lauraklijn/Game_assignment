const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const db = require("./db");
const User = require("./src/user/model-user");

app.use(User);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});