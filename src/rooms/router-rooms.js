const { Router } = require("express");
const Room = require("./model-rooms");

function factory(stream) {
  //To use the stream, create a factory and wrap up the router in it, export the factory(see end page)
  const router = new Router();

  router.get("/room", (req, res, next) => {
    Room.findAll()
      .then(room => res.json(room))
      .catch(error => next(error));
  });

  router.post("/room", async (req, res, next) => {
    console.log(req.body);
    try {
      const room = await Room.create({
        name: req.body.room
      });
      // create redux alike action with type and payload to be readable in frontend
      const action = {
        type: "room/ONE_ROOM",
        payload: room
      };

      const stringAction = JSON.stringify(action); //convert action into a string --> You have to do it in the frontend to (see app.js)
      stream.send(stringAction);

      res.status(201).send("Room created");
    } catch (error) {
      next(error);
    }
  });

  router.get("/room/:id", (req, res, next) => {
    const roomPicked = req.params.id;
    console.log(roomPicked);
    Room.findByPk(roomPicked).then(room => {
      if (!room) {
        res.status(404).send("room not found!");
      } else {
        res.json(room);
      }
    });
  });

  return router;
}

module.exports = factory;
