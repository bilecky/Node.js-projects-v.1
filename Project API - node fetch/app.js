//http://numbersapi.com/${year}/year?json

const fetch = require("node-fetch");



fetch("http://numbersapi.com/2010/year?json")  // we're getting data from numbers API (random worlds events)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log("error", error));
