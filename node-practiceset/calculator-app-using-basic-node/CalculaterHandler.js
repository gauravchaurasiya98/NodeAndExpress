const displayCalculator = (res) => {
  res.write(`
    <form action="/result" method="POST">
      <input type="number" name="num1" placeholder="Enter 1st Number" /> +
      <input type="number" name="num2" placeholder="Enter 2st Number" />
      <input type="submit" value="Sum" />
    </form>
    `);
};

const sumHandler = (req, res) => {
  const bufferData = [];
  req.on("data", (chunk) => {
    console.log("Inside RequestOnData : ", chunk);
    bufferData.push(chunk);
    console.log("bufferData : ", bufferData);
  });
  req.on("end", () => {
    const urlParams = Buffer.concat(bufferData).toString();
    console.log("urlParams : ", urlParams);
    const bodyMap = new URLSearchParams(urlParams);
    console.log("bodyMap : ", bodyMap);
    const requestBody = Object.fromEntries(bodyMap);
    console.log("requestBody : ", requestBody);
    const sum = Number(requestBody.num1) + Number(requestBody.num2);
    console.log("sum : ", sum);
    res.end(`<h1>Sum of entered two numbers is ${sum}</h1>`);
  });
};

exports.displayCalculator = displayCalculator;
exports.sumHandler = sumHandler;
