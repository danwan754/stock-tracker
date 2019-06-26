const request = require('request');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.static(path.join(__dirname, './dist')));
app.use(bodyParser.json());
// app.use(cors());

// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//   res.header('Access-Control-Allow-Headers', 'Content-Type')
//   next()
// })
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});


// // get industry news
// app.get('/api/news/industry/:symbols', function (req, res) {
//   let url = "https://finance.yahoo.com/rss/industry?s=" + req.params.symbols;
//   request(url, function (error, response, body) {
//     res.send(body);
//   });
// });
//
// // get company news
// app.get('/api/news/company/:symbol', function (req, res) {
//   let url = "https://feeds.finance.yahoo.com/rss/2.0/headline?s=" + req.params.symbol;
//   request(url, function (error, response, body) {
//     res.send(body);
//   });
// });

app.post('/feedback', function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.STOCKTRACKER_EMAIL_USER,
      pass: process.env.STOCKTRACKER_EMAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: req.body.email || "ANONYMOUS",
    to: process.env.STOCKTRACKER_EMAIL_USER,
    // subject: req.body.subject || "No subject provided.",
    text: req.body.body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})


app.listen(process.env.PORT || 8080);
