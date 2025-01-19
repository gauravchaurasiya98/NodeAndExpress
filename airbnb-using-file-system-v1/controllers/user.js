// Import Internal Modules
const Favourite = require("../models/Favourite");
const Hotel = require("../models/hotel");

exports.getHotels = (req, res, next) => {
  Hotel.fetchAll((hotels) => {
    res.render("user/hotels", {
      activePage: "hotels",
      pageTitle: "Home | Hotels",
      hotels,
    });
  });
};

exports.getHotelDetail = (req, res, next) => {
  Hotel.findById(req.params.hotelId, (hotel) => {
    if (hotel) {
      res.render("user/hotel-detail", {
        activePage: "hotels",
        pageTitle: "Hotels | Hotel Detail",
        hotel,
      });
    } else {
      res.redirect("/hotels");
    }
  });
};

exports.getFavourites = (req, res, next) => {
  Favourite.fetchAll((hotelIds) => {
    if (hotelIds.length === 0) {
      res.render("user/favourites", {
        activePage: "favourites",
        pageTitle: "Favourites",
        hotels: [],
      });
      return;
    }
    Hotel.fetchAll((hotels) => {
      const favHotels = hotels.filter((hotel) => hotelIds.includes(hotel.id));
      res.render("user/favourites", {
        activePage: "favourites",
        pageTitle: "Favourites",
        hotels: favHotels,
      });
    });
  });
};

exports.addToFavourite = (req, res, next) => {
  Favourite.add(req.params.hotelId);
  res.redirect("/favourites");
};

exports.removeFromFavourite = (req, res, next) => {
  Favourite.remove(req.params.hotelId);
  res.redirect("/favourites");
};

exports.getBookings = (req, res, next) => {
  res.render("user/bookings", {
    activePage: "bookings",
    pageTitle: "Bookings",
    bookings: [],
  });
};
