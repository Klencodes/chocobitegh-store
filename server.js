const compression = require('compression')
const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
const app = express();
app.use(compression());
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 8080);

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
app.use(cors());
app.use(forceSSL());
const path = require('path');
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

