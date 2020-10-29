const axios = require("axios");

const getName = () => {
  // copied this from browser's Network tab
  return axios
    .get("https://www.fakenamegenerator.com/gen-random-us-us.php", {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Upgrade-Insecure-Requests": "1",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
      referrer: "https://www.fakenamegenerator.com/gen-random-us-us.php",
      method: "GET",
      mode: "cors",
    })
    .then((res) => {
      if (res.status == "200") {
        const name = extractName(res.data);
        return new Promise((resolve, reject) => {
          resolve(name);
        });
      } else console.log("error during fetch");
    });
};

const extractName = (markup) => {
  const anchor = `<div class="address">`;
  const anchorIndex = markup.indexOf(anchor);
  const startIndex = markup.indexOf("<h3>", anchorIndex);
  const endIndex = markup.indexOf("</h3>", anchorIndex);

  const name = markup.substring(startIndex + "<h3>".length, endIndex);
  const nameArray = name.split(" ");
  const newNameArray = [nameArray[0], nameArray[2]];
  return newNameArray;
};

const countNames = (names) => {
  dict = {};
  names.forEach((name) => {
    name.forEach((n) => {
      if (dict.hasOwnProperty(n)) {
        dict[n] += 1;
      } else {
        dict[n] = 1;
      }
    });
  });
  return dict;
};

const objToArray = (obj) => {
  const arr = Object.keys(obj).map((key) => [key, obj[key]]);
  arr.sort(compare);
  return arr;
};

const compare = (a, b) => {
  return -1 * (a[1] - b[1]);
};

const getTopTen = (objArray) => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push(objArray[i]);
  }
  return result;
};

exports.getName = getName;
exports.countNames = countNames;
exports.objToArray = objToArray;
exports.getTopTen = getTopTen;
