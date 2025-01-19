// Import Core Modules
const fs = require("fs");
const path = require("path");

// Import Internal Modules
const rootPath = require("../utils/root-path");

const hotelsFilePath = path.join(rootPath, "data", "hotels.json");

module.exports = class Hotel {
  constructor(hotelName, price, location, rating, photoUrl) {
    this.hotelName = hotelName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Hotel.fetchAll((registeredHotels) => {
      // Random integer between 1001 and 10000 (inclusive). Formula: Math.floor(Math.random() * (max - min + 1)) + min;
      this.id = (
        Math.floor(Math.random() * (10000 - 1001 + 1)) + 1001
      ).toString();
      registeredHotels.push(this);
      fs.writeFile(hotelsFilePath, JSON.stringify(registeredHotels), (err) => {
        if (err) {
          console.error("Error while adding hotel in the file:", err);
        }
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(hotelsFilePath, (err, data) => {
      callback(err ? [] : JSON.parse(data));
    });
  }

  static findById(id, callback) {
    Hotel.fetchAll((hotels) => {
      callback(hotels.find((hotel) => hotel.id === id));
    });
  }

  static updateById(id, reqBody) {
    Hotel.fetchAll((hotels) => {
      if (!hotels) {
        console.error("Error: Unable to fetch hotels.");
        return;
      }

      const updatedHotels = hotels.map((hotel) => {
        if (hotel.id === id) {
          // Update the specific hotel
          const updatedHotel = new Hotel(
            reqBody.hotelName || hotel.hotelName,
            reqBody.price || hotel.price,
            reqBody.location || hotel.location,
            reqBody.rating || hotel.rating,
            reqBody.photoUrl || hotel.photoUrl
          );
          updatedHotel.id = id;
          return updatedHotel;
        }
        return hotel; // Keep other hotels unchanged
      });

      // Write the updated array to the file
      fs.writeFile(hotelsFilePath, JSON.stringify(updatedHotels), (err) => {
        if (err) {
          console.error("Error while updating hotel in the file:", err);
        } else {
          console.log(`Hotel with ID(${id}) updated successfully.`);
        }
      });
    });
  }

  static deleteById(id) {
    Hotel.fetchAll((hotels) => {
      hotels = hotels.filter((hotel) => hotel.id !== id);
      fs.writeFile(hotelsFilePath, JSON.stringify(hotels), (err) => {
        if (err) {
          console.error("Error while deleting hotel from the file:", err);
        } else {
          const Favourite = require("./Favourite");
          Favourite.remove(id);
          console.log(`Hotel with ID(${id}) deleted successfully.`);
        }
      });
    });
  }
};
