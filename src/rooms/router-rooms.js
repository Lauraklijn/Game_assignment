const { Router } = require("express");
const Room = require("./model-rooms");
const User = require("../user/model-user");

function factory(stream) {
  //To use the stream, create a factory and wrap up the router in it, export the factory(see end page)
  const router = new Router();

  router.get("/room", (req, res, next) => {
    Room.findAll()
      .then(room => res.json(room))
      .catch(error => next(error));
  });

  router.post("/room", async (req, res, next) => {
    console.log("GOOOOOOOOD", req.body);
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

  router.get("/room/:id", async (req, res, next) => {
    const roomPicked = req.params.id;

    const room = await Room.findAll({
      include: [
        {
          model: User,
          where: { id: req.params.id },
          required: false
        }
      ]
    });
    console.log("HADSIUFHKADUHFIUADHFKDSHFKJHD", room);
    if (!room) {
      res.status(404).send("room not found!");
    } else {
      res.json(room);
    }

    // console.log(roomPicked);

    // Room.findByPk(roomPicked).then(room => {
    //   if (!room) {
    //     res.status(404).send("room not found!");
    //   } else {
    //     res.json(room);
    //   }
    // });
    // // const action = {
    // //   type: "room/ROOM_ID",
    // //   payload: roomPicked
    // // };
    // const getRoomString = JSON.stringify(action);
    // stream.send(getRoomString);
  });

  return router;
}

module.exports = factory;
