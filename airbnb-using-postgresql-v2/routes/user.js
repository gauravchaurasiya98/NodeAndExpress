// Import External Modules
const express = require("express");

// Import Internal Modules
const userController = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/hotels", userController.getHotels);
userRouter.get("/hotels/:hotelId", userController.getHotelDetail);
userRouter.get("/favourites", userController.getFavourites);
userRouter.post("/favourites/:hotelId", userController.addToFavourite);
userRouter.delete("/favourites/:hotelId", userController.removeFromFavourite);
userRouter.get("/bookings", userController.getBookings);

module.exports = userRouter;
