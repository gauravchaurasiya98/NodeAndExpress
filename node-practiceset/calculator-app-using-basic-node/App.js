const http = require("http");
const { requestHandler } = require("./RequestHandler");

const server = http.createServer(requestHandler);

server.listen(3000, () => console.log("Server Started"));
