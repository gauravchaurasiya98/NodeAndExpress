// Import Internal Modules
const pool = require("../utils/pg-config");

module.exports = class Hotel {
  constructor(id, name, price, location, rating, photoUrl) {
    this.id = id || null; // Handle new hotel without an ID
    this.name = name;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  async save() {
    try {
      const res = await pool.query(
        `INSERT INTO hotel (name, price, location, rating, photo_url)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [this.name, this.price, this.location, this.rating, this.photoUrl]
      );
      console.log("Hotel saved successfully:", res.rows[0]);
      return res.rows[0];
    } catch (err) {
      console.error("Error saving hotel to database:", err.message);
      throw err;
    }
  }

  static async fetchAll() {
    try {
      const res = await pool.query("SELECT * from hotel");
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
      console.error("Error while fetching hotels from database:", err.message);
      throw err;
    }
  }

  static async findById(id) {
    try {
      const res = await pool.query("SELECT * FROM hotel WHERE id = $1", [id]);
      if (res.rows.length === 0) {
        throw new Error(`No hotel found with id: ${id}`);
      }
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
      )[0];
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
      const res = await pool.query(
        `UPDATE hotel
        SET name=$1, price=$2, location=$3, rating=$4, photo_url=$5
        WHERE id=$6 RETURNING *`,
        [
          reqBody.name,
          reqBody.price,
          reqBody.location,
          reqBody.rating,
          reqBody.photoUrl,
          id,
        ]
      );
      if (res.rows.length === 0) {
        throw new Error(`No hotel found with id: ${id}`);
      }
      console.log("Hotel updated successfully:", res.rows[0]);
      return res.rows[0];
    } catch (err) {
      console.error(`Error updating hotel by id - ${id}:`, err.message);
      throw err;
    }
  }

  static async deleteById(id) {
    try {
      const res = await pool.query("DELETE FROM hotel WHERE id = $1", [id]);
      if (res.rowCount) {
        console.log(`Hotel deleted successfully with id: ${id}`);
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
