const { Router } = require("express");
const User = require("./model-user");
const bcrypt = require("bcrypt");
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.get("/user", (req, res, next) => {
  const user = req.body;
  User.findAll(user)
    .then(user => res.json(user))
    .catch(error => next(error));
});

router.post("/signup", async (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  try {
    await User.create({
      ...req.body,
      password: hashedPassword
    });
    res.status(201).send("User created");
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please supply a valid email and password");
  } else {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(400).send({
        message: "User with that email does not exist"
      });
    }
    const passwordValid = bcrypt.compareSync(req.body.password, user.password);

    if (passwordValid) {
      const token = toJWT({ id: user.id });

      return res.status(200).send({ token: token, email });
    } else {
      res.status(400).send({
        message: "Password was incorrect"
      });
    }
  }
});

router.get("/user/:id", (req, res, next) => {
  const userId = req.params.id;
  User.findByPk(userId).then(user => {
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.json(user);
    }
  });
});

router.put("/user/:id", (req, res, next) =>
  User.findByPk(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next)
);

module.exports = router;
