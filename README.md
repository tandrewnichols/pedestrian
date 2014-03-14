[![Build Status](https://travis-ci.org/tandrewnichols/pedestrian.png)](https://travis-ci.org/tandrewnichols/pedestrian)

# Pedestrian

A recursive file walker for node.js

## Installation

`npm install pedestrian --save`

## Usage

`pedestrian` can be used either synchronously or asynchronously, depending on whether you pass it a callback.

### Sync

```javascript
var files = pedestrian.walk(path.resolve('lib'));
```

### Async

```javascript
pedestrian.walk(path.resolve('lib'), function(err, files) {

});
```

### Filtering

You can also filter out files by passing a globstar pattern or array of patterns (works with either sync and async).

```javascript
var files = pedestrian.walk(path.resolve('config'), '**/*.json');

pedestrian.walk(path.resolve('routes'), ['**/*.js', '!badFile.js'], function (err, files) {

});
```

See [minimatch](https://github.com/isaacs/minimatch) for more on the kinds of patterns you can use.

### Note

You don't have to use `path.resolve` on the paths you pass, but I recommend it because all files are prefixed with the path, so that will give you a fully qualified path that you can use from anywhere.
