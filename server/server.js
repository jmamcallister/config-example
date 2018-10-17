let argv = require('minimist')(process.argv.slice(2));
let express = require('express');
let mockData = require('./mockData.json');
let app = express();

let PORT = (argv['port'] !== undefined) ? argv['port'] : 8084;

let bodyParser = require('body-parser');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, POST, PUT, OPTIONS, TRACE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma, Expires, Authorization, X-XSRF-TOKEN');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get(mockData.endpoints.configUrl, function (req, res) {
  console.log('get UI config');
  res.status(200).json(
    {
      passwordReset: {
        host: 'localhost',
        port: PORT,
        protocol: 'http',
        captchaSiteKeyUrl: mockData.endpoints.captchaSiteKeyUrl,
        iovationUrl: mockData.endpoints.iovationUrl
      },
      session: {
        sessionTimeoutMinutes: 3
      }
    }
  );
});

app.get(mockData.endpoints.captchaSiteKeyUrl, function (req, res) {
  console.log('get captcha test site key');
  res.status(200).json({
    siteKey: mockData.keys.siteKey
  });
});

app.get(mockData.endpoints.iovationUrl, function (req, res) {
  console.log('get iovation script URL');
  res.status(200).json({
    iovationUrl: mockData.endpoints.iovationScriptUrl
  });
});

app.listen(PORT, function () {
  console.log('Express server listening on port ' + PORT);
});
