var _ = require('underscore'),
    $ = require('varity'),
    async = require('async'),
    minimatch = require('minimatch'),
    kindly = require('kindly');

var walk = $('[s]|af', function(paths, cb) {
  if (cb) {
    async.reduce(paths, [], function(memo, path, next) {
      kindly.get(path, function(err, descriptors) {
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

var match = function(patterns, files) {
  return _.chain(patterns).reduce(function(memo, pattern) {
    return memo.concat(files.filter(minimatch.filter(pattern)));
  }, []).uniq().value();
};

module.exports = {
  walk: $('s+a|[s]f', function(path, patterns, callback) {
    if (callback) {
      walk(path, function(err, files) {
        if (err) callback(err);
        if (patterns.length) callback(null, match(patterns, files));
        else callback(null, files);
      });
    } else {
      return patterns.length ? match(patterns, walk(path)) : walk(path);
    }
  })
};
