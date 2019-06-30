const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// send the react app
//app.get('/', function (req, res) {
//  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//});

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

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
  // axios.get(url)
  // .then(response => {
  //   res.send(reponse.data);
  // });
})


// get batch quote
app.get('/api/quote/batch', (req, res) => {
  var symbols = checkSymbolParam(req.query.symbols, res);
  var url = baseURL + "market/batch?symbols=" + symbols + "&types=quote&" + secretToken;
  axios.get(url)
  .then(response => {
    res.send(response.data);
  });
})

// post a feedback form
app.post('/api/feedback', function(req, res) {
  var from = req.body.email || "ANONYMOUS";
  var message = "From: " + from + "\n\n" + req.body.body;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.STOCKTRACKER_EMAIL_USER,
      pass: process.env.STOCKTRACKER_EMAIL_PASSWORD
    }
  });

  var mailOptions = {
    to: process.env.STOCKTRACKER_EMAIL_USER,
    subject: req.body.subject || req.body.email || "No subject",
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.send({message: "Thank you for the feedback."});
})


app.listen(process.env.PORT || 3001);
