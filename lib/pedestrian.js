var _ = require('underscore'),
    EventEmitter = require('events').EventEmitter,
    util = require('util'),
    $ = require('varity'),
    extend = require('config-extend');

var defaults = {
  async: false
};

var Pedestrian = function Pedestrian (globalOptions) {
  EventEmitter.call(this);
  this._options = extend({}, defaults, (globalOptions || {}));
};

util.inherits(Pedestrian, EventEmitter);

Pedestrian.prototype.walk = function(path, options, callback) {
  this._options = extend(this._options, (options || {}));
};

Pedestrian.prototype.walkSync = function(path, options, callback) {
  
};

module.exports = Pedestrian;
