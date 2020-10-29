const axios = require("axios");
const utils = require("./utils");

const startTime = Date.now();
const array = Array(100).fill(0);

const requests = array.map((value, index) => {
  return utils.getName();
});

axios.all(requests).then((responses) => {
  const obj = utils.countNames(responses);
  const arr = utils.objToArray(obj);
  const mostCommonNames = utils.getTopTen(arr);
  console.log("Most common names:");
  console.log(mostCommonNames);
  const endTime = Date.now();
  console.log("Program running time ", (endTime - startTime) / 1000);
});
