const { Router } = require("express");
const Room = require("./model-rooms");

const router = new Router();

router.get("/room", (req, res, next) => {
  Room.findAll()
    .then(room => res.json(room))
    .catch(error => next(error));
});

router.post("/room", async (req, res, next) => {
  try {
    await Room.create({
      ...req.body
    });
    res.status(201).send("Room created");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
