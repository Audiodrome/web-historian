var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var archive = Promise.promisifyAll(require('../helpers/archive-helpers'));
// require more modules/folders here!
var serve = Promise.promisifyAll(require('./http-helpers'));

var actions = {
  GET: function(request, response, statusCode) {
    response.writeHead(statusCode, serve.headers);
  },
};

var sendResponse = function(request, response, statusCode) {
  var action = actions[request.method];

  if (action) {
    action(request, response, statusCode);
  }
};

exports.handleRequest = function (req, res) {

  console.log(req.method);
  var statusCode = {
    '200': 200,
    '201': 201,
    '404': 404
  };
  if (req.method === 'GET') {
    sendResponse(req, res, statusCode[200]);
  }

  // archive.readListOfUrlsAsync()
  //   .then(function(data) {
  //     console.log(data);
  //     // return ['example1.com', 'example2.com'];
  //   });

  // archive.isUrlArchivedAsync()
  //   .then(function(data) {
  //     console.log(data);
  //     // return ['example1.com', 'example2.com'];
  //   });

  res.end(archive.paths.siteAssets);
};
