const axios = require("axios");
const utils = require("./utils");

const array = Array(100).fill(0);

const requests = array.map((value, index) => {
  return utils.getName();
});

axios.all(requests).then((responses) => {
  console.log(responses);
});
