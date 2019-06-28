const request = require('request');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
// const nodemailer = require('nodemailer');
const app = express();

app.use(express.static(path.join(__dirname, './dist')));
app.use(bodyParser.json());
// app.use(cors());

var secretToken = "token=sk_772e822c4d8e48d98d552e693c0e7d93";
var baseURL = "https://cloud.iexapis.com/v1/stock/";


// return the symbol or error message for missing symbol query param
function checkSymbolParam(symbol, res) {
  if (!symbol) {
    var message = "Missing [symbol] query parameter in request.";
    res.status(400).send(message);
  }
  return symbol;
}

// validate and return the period or error message for missing period query param
function validatePeriodParam(period, res) {
  if (period && ['1d', '1m', '3m', '6m', 'ytd', '1y', '2y', '5y'].includes(period)) {
    return period;
  }
  else {
    var message = "Invalid [period] query parameter in request. Possible values: ['1d', '1m', '3m', '6m', 'ytd', '2y', '5y']";
    res.status(400).send(message);
  }
}

// send the react app
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

// get stock quote
app.get('/api/quote', function(req, res) {
  var symbol = checkSymbolParam(req.query.symbol, res);
  var url = baseURL + symbol + "/quote" + "?" + secretToken;
  axios.get(url)
  .then(response => {
    res.send(response.data);
  });
})

// get quote news
app.get('/api/news/analysis', (req, res) => {
  var symbol = checkSymbolParam(req.query.symbol, res);
  var url = baseURL + symbol + "/news/last/2" + "?" + secretToken;
  axios.get(url)
  .then(response => {
    res.send(response.data);
  });
})

// get company logo
app.get('/api/logo', (req, res) => {
  var symbol = checkSymbolParam(req.query.symbol, res);
  var url = baseURL + symbol + "/logo" + "?" + secretToken;
  axios.get(url)
  .then(response => {
    res.send(response.data);
  });
})

// get stock price over the past month period
app.get('/api/chart', (req, res) => {
  var symbol = checkSymbolParam(req.query.symbol, res);
  var period = validatePeriodParam(req.query.period, res);
  var url = baseURL + symbol + "/chart/" + period + "?" + secretToken;
  axios.get(url)
  .then(response => {
    res.send(response.data);
  });
})

// get company news
app.get('/api/news/company', (req, res) => {
  var symbol = checkSymbolParam(req.query.symbol, res);
  var url = "https://feeds.finance.yahoo.com/rss/2.0/headline?s=" + symbol;
  request(url, function (error, response, body) {
    res.send(body);
  });
})


// get batch quote
app.get('/api/quote/batch', (req, res) => {
  // console.log(req.query.symbols);
  var symbols = checkSymbolParam(req.query.symbols, res);
  var url = baseURL + "market/batch?symbols=" + symbols + "&types=quote&" + secretToken;
  axios.get(url)
  .then(response => {
    res.send(response.data);
  });
})

// app.post('/feedback', function(req, res) {
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.STOCKTRACKER_EMAIL_USER,
//       pass: process.env.STOCKTRACKER_EMAIL_PASSWORD
//     }
//   });
//
//   var mailOptions = {
//     from: req.body.email || "ANONYMOUS",
//     to: process.env.STOCKTRACKER_EMAIL_USER,
//     // subject: req.body.subject || "No subject provided.",
//     text: req.body.body
//   };
//
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// })


app.listen(process.env.PORT || 3001);
