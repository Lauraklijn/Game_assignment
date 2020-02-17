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

router.post("/user", async (req, res, next) => {
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

router.post("/login", async (request, response) => {
  console.log(request.body);

  const user = await User.findOne({ where: { email: request.body.email } });

  const passwordValid = bcrypt.compareSync(
    request.body.password,
    user.password
  );

  if (passwordValid) {
    const token = toJWT({ id: user.id });

    return response.status(200).send({ token: token });
  }
});

module.exports = router;
