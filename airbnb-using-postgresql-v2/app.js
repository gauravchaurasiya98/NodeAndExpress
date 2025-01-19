// Import Core Modules
const path = require("path");

// Import External Modules
const express = require("express");
const methodOverride = require("method-override");

// Import Internal Modules
const rootPath = require("./utils/root-path");
const indexRouter = require("./routes/index");
const hostRouter = require("./routes/host");
const userRouter = require("./routes/user");

const PORT = 3000;

const app = express();
// Set the view engine to ejs
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(rootPath, "views"));

// Parsing payload from request object
app.use(express.urlencoded({ extended: true }));

// Use method-override to support DELETE method
app.use(methodOverride("_method"));

// Serve all the requests for index page
app.use(indexRouter);

// Serve all the requests for host users
app.use("/host", hostRouter);

// Serve all the requests for customer users
app.use(userRouter);

// Serve static files from the 'public' directory
app.use(express.static(path.join(rootPath, "public")));

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
