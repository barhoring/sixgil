const axios = require("axios");

const getName = () => {
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
  const anchorLength = anchor.length;
  const anchorIndex = markup.indexOf(anchor);
  const startIndex = markup.indexOf("<h3>", anchorIndex);
  const endIndex = markup.indexOf("</h3>", anchorIndex);

  const name = markup.substring(startIndex + "<h3>".length, endIndex);
  return name;
};

exports.getName = getName;
