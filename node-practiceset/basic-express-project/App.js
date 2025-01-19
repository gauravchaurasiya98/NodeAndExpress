// Importing external module
const express = require("express");

const app = express();
app.listen(3000, () => console.log("Server Started"));

app.use((req, res, next) => {
  console.log("Request reached to dummy middleware 1.", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("Request reached to dummy middleware 2.", req.url, req.method);
  next();
});

app.get("/", (req, res, next) => {
  console.log("Sending response from home path", req.url, req.method);
  res.send("<h1>Response from basic express project</h1>");
});

app.get("/contact-us", (req, res, next) => {
  console.log("Sending response from contact-us path", req.url, req.method);
  res.send(`
      <h1>Please fill your details to contact us.</h1>
      <form action="/contact-us" method="POST">
        <input type="text" name="name" placeholder="Enter your name" />
        <input type="email" name="email" placeholder="Enter your email" />
        <input type="submit" value="Submit" />
      </form>
    `);
});

app.post("/contact-us", (req, res, next) => {
  console.log("Sending response from contact-us path", req.url, req.method);
  res.send("<h1>Thanks for filling details, Will reach out shortly.</h1>");
});
