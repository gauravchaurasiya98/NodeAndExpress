const Pool = require("pg-pool");

const pool = new Pool({
  database: "postgres",
  user: "postgres",
  password: "Password",
  port: 5432,
  // ssl: true,
  max: 5, // set pool max size to 5
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
  maxUses: 7500, // close (and replace) a connection after it has been used 7500 times
});

pool.on("connect", async (client) => {
  try {
    // Set the search_path
    await client.query("SET search_path TO airbnb");
    console.log("airbnb schema set for connection");
  } catch (err) {
    console.error("Error while setting search_path to airbnb:", err);
  }
});

module.exports = pool;
