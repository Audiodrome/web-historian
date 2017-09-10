var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  console.log(asset);
  archive.readPageDirAsync(asset)
    .then((data) => {
      console.log('it made it', data);
      return archive.readPageFileAsync(asset + '/' + data[0]);
    })
    .then((html) => {
      console.log('html', html);
      res.writeHead(200, exports.headers);
      res.end(html);
    })
    .catch((err) => {
      console.log('data did not make it');
    });
  // if (asset === 'index.html') { callback('did not serve html'); }
  // console.log('Now serving: ', asset);
};



// As you progress, keep thinking about what helper functions you can put here!
