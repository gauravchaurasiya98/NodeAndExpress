// Import Internal Modules
const Hotel = require("../models/hotel");

exports.getHostHotels = (req, res) => {
  Hotel.fetchAll().then((hotels) => {
    res.render("host/host-hotels", {
      activePage: "host-hotels",
      pageTitle: "Home | Reistered Hotels",
      hotels,
    });
  });
};

exports.getAddHotelForm = (req, res) => {
  res.render("host/hotel-form", {
    activePage: "add-hotel",
    pageTitle: "Add Hotel",
    hotel: null,
  });
};

exports.getUpdateHotelForm = (req, res) => {
  Hotel.findById(req.params.hotelId).then((hotel) => {
    res.render("host/hotel-form", {
      activePage: "host-hotels",
      pageTitle: "Update Hotel",
      hotel,
    });
  });
};

exports.addHotel = (req, res) => {
  const { name, price, location, rating, photoUrl } = req.body;
  const hotel = new Hotel(null, name, price, location, rating, photoUrl);
  hotel.save().finally(() => res.redirect("/host/hotels"));
};

exports.updateHotel = (req, res) => {
  Hotel.updateById(req.params.hotelId, req.body).finally(() =>
    res.redirect("/host/hotels")
  );
};

exports.deleteHotel = (req, res) => {
  Hotel.deleteById(req.params.hotelId).finally(() =>
    res.redirect("/host/hotels")
  );
};
