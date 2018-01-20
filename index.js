var express = require('express')
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// api service to withdraw amount from cryptominer
app.post('/api/withdraw', function(req, res) {
  console.log(req.body);
  if (req.body.address && req.body.amount && parseFloat(req.body.amount) > 0.001) {
    res.status(200).json({
      status: 'Pending Verification',
      message: 'You request is being validated, once confirmed the payment will be processed. It will take around 3 - 7 working days to confirm and process the payment. \n Happy Mining!'
    });
  } else {
    res.status(400).json({
      status: 'Failed',
      message: 'Invalid request, please check the details'
    });
  }
});

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});
