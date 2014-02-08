var _ = require('underscore'),
    EventEmitter = require('events').EventEmitter,
    util = require('util'),
    minimatch = require('minimatch'),
    kindly = require('kindly');

//var Pedestrian = function Pedestrian (globalOptions) {
  //EventEmitter.call(this);
  //this._options = extend({}, defaults, (globalOptions || {}));
//};

//util.inherits(Pedestrian, EventEmitter);

//Pedestrian.prototype.walk = function(path, options, callback) {
  //this._options = extend(this._options, options);
//};

//Pedestrian.prototype.walkSync = function(path, options) {
  //this._options = extend(this._options, options);
//};


var walk = function(path) {
  var descriptors = kindly.get(path);
  return _(descriptors.directories).inject(function(memo, directory){
    return memo.concat(walk(directory));
  }, _(descriptors.files).map(function(file){
    return file;
  }));
};

module.exports = {
  walk: function(path, patterns, callback) {
    var files = walk(path);
    if (patterns && patterns.length) {
      if (typeof patterns === 'string') patterns = [patterns];
      return _.chain(patterns).reduce(function(memo, pattern) {
        return memo.concat(files.filter(minimatch.filter(pattern)));
      }, []).uniq().value();
    } else {
      return files;
    }
  }
};
