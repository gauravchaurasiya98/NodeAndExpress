// Import Core Modules
const fs = require("fs");
const path = require("path");

// Import Internal Modules
const rootPath = require("../utils/root-path");
const Hotel = require("./hotel");

const favFilePath = path.join(rootPath, "data", "favourites.json");

module.exports = class Favourite {
  static add(hotelId) {
    Hotel.findById(hotelId, (hotel) => {
      if (hotel) {
        Favourite.fetchAll((hotelIds) => {
          if (hotelIds.includes(hotelId)) {
            console.log(
              `Hotel (${hotelId}) has already been added to Favourites.`
            );
          } else {
            hotelIds.push(hotelId);
            fs.writeFile(favFilePath, JSON.stringify(hotelIds), (err) => {
              if (err) {
                console.error(
                  `Error while adding favourite (${hotelId}):`,
                  err
                );
              } else {
                console.log(
                  `Hotel (${hotelId}) successfully added to Favourites.`
                );
              }
            });
          }
        });
      } else {
        console.log(`Hotel (${hotelId}) does not exist to mark as favourite.`);
      }
    });
  }

  static remove(hotelId) {
    Favourite.fetchAll((hotelIds) => {
      const index = hotelIds.indexOf(hotelId);
      if (index > -1 && hotelIds.splice(index, 1)) {
        console.log(`Hotel (${hotelId}) has been removed from Array.`);
        fs.writeFile(favFilePath, JSON.stringify(hotelIds), (err) => {
          if (err) {
            console.error(
              `Error while writing file after removing hotel(${hotelId}) from Array :`,
              err
            );
          } else {
            console.log(
              `Hotel (${hotelId}) successfully removed from Favourites.`
            );
          }
        });
      } else {
        console.log(`Hotel (${hotelId}) was not added to Favourites.`);
      }
    });
  }

  static fetchAll(callback) {
    fs.readFile(favFilePath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          // File does not exist; return an empty array
          callback([]);
        } else {
          console.error("Error reading favourites.json:", err);
          callback([]);
        }
      } else {
        try {
          callback(JSON.parse(data));
        } catch (parseError) {
          console.error("Error parsing favourites.json:", parseError);
          callback([]);
        }
      }
    });
  }
};
