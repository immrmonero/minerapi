var express = require('express')
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
// var puppeteer = require('puppeteer');

// function delay() {
//   return new Promise((resolve) => {
//   setTimeout(resolve, 1000);
//   });
// }

// (async() => {
//   const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
//   const page = await browser.newPage();
//   await page.goto('https://authedmine.com/media/miner.html?key=9vufBAZVFa4oizIODxRrBfuEkVWR69d5', {waitUntil: 'networkidle2'});
//   await page.waitForSelector('#mining-start');
//   await page.click('#mining-start');
//   await delay().then(() => {
//   console.log('Miner Started');
//     setInterval(() => {
//       page.evaluate(() => {
//         return {
//           totalHash: document.querySelector('#hashes-total').innerText,
//           hashesPerSecond: document.querySelector('#hashes-per-second').innerText
//         };
//       }).then((hashes) => {
//         console.log(`Hashes/sec: ${hashes.hashesPerSecond}/s Total Hashes: ${hashes.totalHash}`);
//       });
//     }, 1000);
//   });
// })();

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


http.listen(process.env.PORT || 3000, function(){
	console.log("listening on port " + http.address().port);
});
