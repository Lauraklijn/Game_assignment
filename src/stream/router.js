// create stream directory

const Sse = require("json-sse"); // install + import sse nodejs
const { Router } = require("express");
const Room = require("../rooms/model-rooms");

const stream = new Sse(); //create new stream

const router = new Router();

router.get("/stream", async (req, res, next) => {
  try {
    const allRooms = await Room.findAll();

    // create redux alike action with type and payload to be readable in frontend
    const action = {
      type: "room/ALL_ROOMS",
      payload: allRooms
    };
    // create stringaction to be able to send it to the stream
    const stringAction = JSON.stringify(action);
    stream.updateInit(stringAction);
    stream.init(req, res);
  } catch (e) {
    next(e);
  }
});

module.exports = { streamRouter: router, stream }; // export streamRouter + stream

// to check use: http :4000/stream --stream
// You should get an event like this: id: 0
// data: {"type":"room/ALL_ROOMS","payload":[{"id":1,"name":"Laura","createdAt":"2020-02-18T11:10:29.651Z","updatedAt":"2020-02-18T11:10:29.651Z"}]}
