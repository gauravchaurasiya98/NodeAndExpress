// Import Internal Modules
const Hotel = require("../models/hotel");

exports.getIndex = (req, res) => {
  Hotel.fetchAll().then((hotels) => {
    res.render("index", {
      activePage: "index",
      pageTitle: "Home",
      hotels,
    });
  });
};
