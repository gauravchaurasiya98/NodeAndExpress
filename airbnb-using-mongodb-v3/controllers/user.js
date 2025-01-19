// Import Internal Modules
const Hotel = require("../models/hotel");
const Favourite = require("../models/Favourite");

exports.getHotels = (req, res) => {
  Hotel.fetchAll().then((hotels) => {
    res.render("user/hotels", {
      activePage: "hotels",
      pageTitle: "Home | Hotels",
      hotels,
    });
  });
};

exports.getHotelDetail = (req, res) => {
  Hotel.findById(req.params.hotelId)
    .then((hotel) => {
      res.render("user/hotel-detail", {
        activePage: "hotels",
        pageTitle: "Hotels | Hotel Detail",
        hotel,
      });
    })
    .catch(() => res.redirect("/hotels"));
};

exports.getFavourites = (req, res) => {
  Favourite.fetchAll().then((hotels) => {
    res.render("user/favourites", {
      activePage: "favourites",
      pageTitle: "Favourites",
      hotels,
    });
  });
};

exports.addToFavourite = (req, res) => {
  Favourite.add(req.params.hotelId)
    .then(() => res.redirect("/favourites"))
    .catch((err) => res.redirect("/hotels"));
};

exports.removeFromFavourite = (req, res) => {
  Favourite.remove(req.params.hotelId).finally(() =>
    res.redirect("/favourites")
  );
};

exports.getBookings = (req, res) => {
  res.render("user/bookings", {
    activePage: "bookings",
    pageTitle: "Bookings",
    bookings: [],
  });
};
