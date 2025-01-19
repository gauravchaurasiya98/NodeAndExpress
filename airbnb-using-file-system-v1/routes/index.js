// Import External Modules
const express = require("express");

// Import Internal Modules
const indexController = require("../controllers/index");

const indexRouter = express.Router();

indexRouter.get("/", indexController.getIndex);

module.exports = indexRouter;
