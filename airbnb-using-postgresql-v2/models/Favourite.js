// Import Internal Modules
const pool = require("../utils/pg-config");
const Hotel = require("./hotel");

module.exports = class Favourite {
  static async add(hotelId) {
    try {
      const count = await Favourite.getFavouriteCountByHotelId(hotelId);
      if (count) {
        console.warn(
          `Hotel (${hotelId}) has already been added to Favourites.`
        );
      } else {
        const res = await pool.query(
          "INSERT INTO favourite (hotel_id) VALUES ($1) RETURNING *",
          [hotelId]
        );
        console.log(
          `Hotel (${hotelId}) added to favourites successfully:`,
          res.rows[0]
        );
      }
    } catch (err) {
      console.error(`Error while adding favourite (${hotelId}):`, err.message);
      throw err;
    }
  }

  static async remove(hotelId) {
    try {
      const res = await pool.query(
        "DELETE FROM favourite WHERE hotel_id = $1",
        [hotelId]
      );
      if (res.rowCount) {
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
      const res = await pool.query(
        `SELECT * from hotel WHERE id IN
        (SELECT hotel_id from favourite)`
      );
      return res.rows.map(
        (hotel) =>
          new Hotel(
            hotel.id,
            hotel.name,
            hotel.price,
            hotel.location,
            hotel.rating,
            hotel.photo_url
          )
      );
    } catch (err) {
      console.error("Error while fetching favourite hotels:", err.message);
      throw err;
    }
  }

  static async getFavouriteCountByHotelId(hotelId) {
    try {
      const res = await pool.query(
        "SELECT count(*) FROM favourite WHERE hotel_id = $1",
        [hotelId]
      );
      return +res.rows[0].count;
    } catch (err) {
      console.error(
        `Error while fetching favourite count by hotelId - ${hotelId} :`,
        err.message
      );
      throw err;
    }
  }
};
