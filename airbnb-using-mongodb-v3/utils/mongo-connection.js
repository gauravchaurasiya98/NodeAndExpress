const { MongoClient } = require("mongodb");

let _db;

exports.connectToMongoDB = async () => {
  const url = "mongodb://127.0.0.1:27017";
  try {
    const client = await MongoClient.connect(url);
    _db = client.db("airbnb");
    console.log(`MongoDB connected successfully to server (${url})`);
  } catch (err) {
    console.error(
      `Error while connecting to Mongo Server (${url}) :`,
      err.message
    );
    throw err;
  }
};

exports.getDB = () => {
  if (_db) {
    return _db;
  } else {
    throw new Error("Database not connected");
  }
};
