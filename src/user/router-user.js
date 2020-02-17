const { Router } = require("express");
const User = require("./model-user");

const router = new Router();

router.get("/user", (req, res, next) => {
  const user = req.body;
  User.findAll(user)
    .then(user => res.json(user))
    .catch(error => next(error));
});

router.post("/user", (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(error => next(error));
});

module.exports = router;
