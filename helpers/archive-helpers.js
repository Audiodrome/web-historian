var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

var binarySearch = function(array, key) {
  var lo = 0;
  var hi = array.length - 1;
  var mid;
  var element;
  while (lo <= hi) {
    mid = ((lo + hi) >> 1);
    element = array[mid];
    if (element < key) {
      lo = mid + 1;
    } else if (element > key) {
      hi = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
};

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
exports.readPageFile = function(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } 
    callback(err, data);
  });
};

exports.readPageDir = function(path, callback) {
  fs.readdir(path, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    }
    callback(err, data);
  });
};

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } 
    callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } 
    data = data.split('\n');
    data = data.sort();
    var index = binarySearch(data, url);

    index === -1 ? callback(false) : callback(true);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url.toString(), (err) => {
    if (err) {
      callback(err);
    }
    callback(url);
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    }
    data.includes(url) ? callback(true) : callback(false);
  });
};

exports.downloadUrls = function(urls) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    console.log('data', data);
    if (err) {
      console.log(err);
    } 
  
    for (let i = 0; i < urls.length; i++) {
      exports.isUrlArchived(urls[i], function(isArchived) {
        if (!isArchived) {
          // console.log('google?', urls[i]);
          fs.writeFile(exports.paths.archivedSites + '/' + urls[i], urls[i], 'utf8', function (err) {
            console.log('google?', urls[i]);
            if (err) {
              console.log('error', err);
            }
          });
        }
      });
    }
  });
};

