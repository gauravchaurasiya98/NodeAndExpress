// Import External Modules
const express = require("express");

// Import Internal Modules
const hostController = require("../controllers/host");

const hostRouter = express.Router();

hostRouter.get("/hotels", hostController.getHostHotels);
hostRouter.get("/hotels/add", hostController.getAddHotelForm);
hostRouter.post("/hotels", hostController.addHotel);
hostRouter.get("/hotels/:hotelId", hostController.getUpdateHotelForm);
hostRouter.put("/hotels/:hotelId", hostController.updateHotel);
hostRouter.delete("/hotels/:hotelId", hostController.deleteHotel);

module.exports = hostRouter;
