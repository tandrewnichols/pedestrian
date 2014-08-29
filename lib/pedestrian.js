var _ = require('underscore');
var $ = require('varity');
var async = require('async');
var minimatch = require('minimatch');
var kindly = require('kindly');
var path = require('path');
var callerId = require('caller-id');

var walk = $('[s]|af', function(paths, cb) {
  if (cb) {
    async.reduce(paths, [], function(memo, dir, next) {
      kindly.get(dir, function(err, descriptors) {
        memo = memo.concat(descriptors.files);
        if (descriptors.directories.length) {
          walk(descriptors.directories, function(err, files) {
            next(err, memo.concat(files));
          });
        } else {
          next(err, memo);
        }
      });
    }, cb);
  } else {
    var descriptors = kindly.get(paths.shift());
    return _(descriptors.directories).inject(function(memo, directory){
      return memo.concat(walk(directory));
    }, _(descriptors.files).map(function(file){
      return file;
    }));
  }
});

var match = function(dir, patterns, files) {
  return _.chain(patterns).reduce(function(memo, pattern) {
    return memo.concat(files.filter(minimatch.filter(dir + '/' + pattern)));
  }, []).uniq().value();
};

exports.walk = function() {
  var args = [].slice.call(arguments);
  if (args[0].charAt(0) !== '/') {
    var caller = callerId.getData();
    args[0] = path.resolve(path.dirname(caller.filePath), args[0]);
  }
  return exports.__walk.apply(null, args);
};

exports.__walk = $('s+o+a|[s]f', function(dir, options, patterns, callback) {
  options.patterns = options.patterns || patterns;
  if (callback) {
    walk(dir, function(err, files) {
      if (err) callback(err);
      if (options.patterns.length) callback(null, match(dir, options.patterns, files));
      else callback(null, files);
    });
  } else {
    return options.patterns.length ? match(dir, options.patterns, walk(dir)) : walk(dir);
  }
});
