// NBP API - EXCHANGE RATES - REQUEST METHOD
//http://api.nbp.pl/api/exchangerates/rates/a/${code}/
const request = require("request");
const fs = require("fs");

const validCodes = ["usd", "eur", "gbp", "chf"];

const code = process.argv[2];

const isValid = validCodes.find((currencies) => currencies === code)
  ? true
  : false;
console.log(isValid);

const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`;

request(url, { json: true }, (err, res, body) => {
  if (err) {
    return console.log("błąąąąąąąd", err);
  }
  const message = `Srednia cena ${body.currency} w dniu ${body.rates[0].effectiveDate} wynosi ${body.rates[0].mid} zł`;
  console.log(message); // for example "node app.js usd  - or other currencies in command line to check it"

  fs.appendFile("currencies.txt", message + "\n", (err) => {}); // i created new folder where results are saved after checking it in console
  console.log("kursy zostaly dodane do pliku");
});
