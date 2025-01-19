const { displayCalculator, sumHandler } = require("./CalculaterHandler");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  res.setHeader("Content-Type", "text/html");
  switch (req.url) {
    case "/":
      res.write(`
        <h1>Welcome to Calculator App</h1>
        <a href="/calculator">Go to Calculator</a>
      `);
      break;
    case "/calculator":
      displayCalculator(res);
      break;
    case "/result":
      return sumHandler(req, res);
    default:
      res.statusCode = 404;
      res.write(`
        <h1>404 - Page not found</h1>
        <a href="/">Go to Home</a>
      `);
      break;
  }
  return res.end();
};

exports.requestHandler = requestHandler;
