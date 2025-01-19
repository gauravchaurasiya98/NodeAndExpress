// Import External Modules
const { ObjectId } = require("mongodb");

// Import Internal Modules
const { getDB } = require("../utils/mongo-connection");
const Favourite = require("./Favourite");

module.exports = class Hotel {
  constructor(name, price, location, rating, photoUrl) {
    this.name = name;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  async save() {
    try {
      const res = await getDB().collection("hotel").insertOne(this);
      console.log("Hotel saved successfully:", res);
      return res;
    } catch (err) {
      console.error("Error saving hotel to database:", err.message);
      throw err;
    }
  }

  static async fetchAll() {
    try {
      return await getDB().collection("hotel").find().toArray();
    } catch (err) {
      console.error("Error while fetching hotels from database:", err.message);
      throw err;
    }
  }

  static async findById(id) {
    try {
      const hotel = await getDB()
        .collection("hotel")
        .findOne({ _id: new ObjectId(id) });
      if (hotel) {
        return hotel;
      } else {
        throw new Error(`No hotel found with id: ${id}`);
      }
    } catch (err) {
      console.error(
        `Error while fetching hotel where id is ${id}:`,
        err.message
      );
      throw err;
    }
  }

  static async updateById(id, reqBody) {
    try {
      const hotel = await getDB()
        .collection("hotel")
        .findOneAndReplace(
          { _id: new ObjectId(id) }, // Query to find the document
          reqBody, // Replacement document
          { returnDocument: "after" } // Return the updated document
        );
      if (hotel) {
        console.log("Hotel updated successfully:", hotel);
        return hotel;
      }
      throw new Error(`No hotel found with id: ${id}`);
    } catch (err) {
      console.error(`Error updating hotel by id - ${id}:`, err.message);
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      const hotel = await getDB()
        .collection("hotel")
        .findOneAndDelete({ _id: new ObjectId(id) });
      if (hotel) {
        console.log(`Hotel deleted successfully with id: ${id}`);
        Favourite.remove(id);
      } else {
        console.warn(`No hotel found for deletion with id: ${id}`);
      }
    } catch (err) {
      console.error(
        `Error while deleting hotel with hotelId - ${id}:`,
        err.message
      );
      throw err;
    }
  }
};
