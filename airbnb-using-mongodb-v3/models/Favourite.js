// Import External Modules
const { ObjectId } = require("mongodb");

// Import Internal Modules
const { getDB } = require("../utils/mongo-connection");

module.exports = class Favourite {
  static async add(hotelId) {
    try {
      const count = await Favourite.getFavouriteCountByHotelId(hotelId);
      if (count) {
        console.warn(
          `Hotel (${hotelId}) has already been added to Favourites.`
        );
      } else {
        const favDoc = await getDB()
          .collection("favourite")
          .insertOne({ hotelId });
        console.log(
          `Hotel (${hotelId}) added to favourites successfully:`,
          favDoc
        );
      }
    } catch (err) {
      console.error(`Error while adding favourite (${hotelId}):`, err.message);
      throw err;
    }
  }

  static async remove(hotelId) {
    try {
      const deletedDoc = await getDB()
        .collection("favourite")
        .findOneAndDelete({ hotelId });
      if (deletedDoc) {
        console.log(
          `Hotel removed successfully from favourites with hotelId: ${hotelId}`
        );
      } else {
        console.warn(
          `No favourite hotel found to remove from favourites with hotelId: ${hotelId}`
        );
      }
    } catch (err) {
      console.error(
        `Error while removing favourite hotel with hotelId - ${hotelId}:`,
        err.message
      );
      throw err;
    }
  }

  static async fetchAll() {
    try {
      const favHotelDocs = await getDB()
        .collection("favourite")
        .find()
        .toArray();
      const favHotelObjectIds = favHotelDocs.map(
        (favHotelDoc) => new ObjectId(favHotelDoc.hotelId)
      );
      const favHotels = await getDB()
        .collection("hotel")
        .find({ _id: { $in: favHotelObjectIds } })
        .toArray();
      return favHotels;
    } catch (err) {
      console.error("Error while fetching favourite hotels:", err.message);
      throw err;
    }
  }

  static async getFavouriteCountByHotelId(hotelId) {
    try {
      const count = await getDB()
        .collection("favourite")
        .countDocuments({ hotelId });
      return count;
    } catch (err) {
      console.error(
        `Error while fetching favourite count by hotelId - ${hotelId} :`,
        err.message
      );
      throw err;
    }
  }
};
