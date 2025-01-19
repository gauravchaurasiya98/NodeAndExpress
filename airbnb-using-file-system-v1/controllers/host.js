// Import Internal Modules
const Hotel = require("../models/hotel");

exports.getHostHotels = (req, res, next) => {
  Hotel.fetchAll((hotels) => {
    res.render("host/host-hotels", {
      activePage: "host-hotels",
      pageTitle: "Home | Reistered Hotels",
      hotels,
    });
  });
};

exports.getAddHotelForm = (req, res, next) => {
  res.render("host/hotel-form", {
    activePage: "add-hotel",
    pageTitle: "Add Hotel",
    hotel: null,
  });
};

exports.getUpdateHotelForm = (req, res, next) => {
  Hotel.findById(req.params.hotelId, (hotel) => {
    res.render("host/hotel-form", {
      activePage: "host-hotels",
      pageTitle: "Update Hotel",
      hotel,
    });
  });
};

exports.addHotel = (req, res, next) => {
  const { hotelName, price, location, rating, photoUrl } = req.body;
  const hotel = new Hotel(hotelName, price, location, rating, photoUrl);
  hotel.save();
  res.redirect("/host/hotels");
};

exports.updateHotel = (req, res, next) => {
  Hotel.updateById(req.params.hotelId, req.body);
  res.redirect("/host/hotels");
};

exports.deleteHotel = (req, res, next) => {
  Hotel.deleteById(req.params.hotelId);
  res.redirect("/host/hotels");
};
