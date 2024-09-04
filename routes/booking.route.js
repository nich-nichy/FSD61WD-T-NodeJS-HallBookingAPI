const express = require("express");
const router = express.Router();
const { createRoomFunction, bookRoomFunction, getBookedRoomsFunction, getBookedCustomersFunction, getRepeatedCustomersFunction } = require("../controllers/booking.controller");

router.post("/createRoom", createRoomFunction);

router.post("/bookRoom", bookRoomFunction);

router.get("/getBookedRooms", getBookedRoomsFunction);

router.get("/getBookedCustomers", getBookedCustomersFunction);

router.get("/getRepeatedCustomers", getRepeatedCustomersFunction);

module.exports = router;