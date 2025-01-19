// Import Internal Modules
const Hotel = require("../models/hotel");

exports.getIndex = (req, res, next) => {
  Hotel.fetchAll((hotels) => {
    res.render("index", {
      activePage: "index",
      pageTitle: "Home",
      hotels,
    });
  });
};
