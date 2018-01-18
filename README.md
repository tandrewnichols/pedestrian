[![Build Status](https://travis-ci.org/tandrewnichols/pedestrian.png)](https://travis-ci.org/tandrewnichols/pedestrian) [![downloads](http://img.shields.io/npm/dm/pedestrian.svg)](https://npmjs.org/package/pedestrian) [![npm](http://img.shields.io/npm/v/pedestrian.svg)](https://npmjs.org/package/pedestrian) [![Code Climate](https://codeclimate.com/github/tandrewnichols/pedestrian/badges/gpa.svg)](https://codeclimate.com/github/tandrewnichols/pedestrian) [![Test Coverage](https://codeclimate.com/github/tandrewnichols/pedestrian/badges/coverage.svg)](https://codeclimate.com/github/tandrewnichols/pedestrian) [![dependencies](https://david-dm.org/tandrewnichols/pedestrian.png)](https://david-dm.org/tandrewnichols/pedestrian)

# Pedestrian

A recursive file walker for node.js

## Installation

`npm install pedestrian --save`

## Usage

Synchronously or asynchronously walk a file tree and receive an array of files back.

### API

#### walk(directory[, patterns])

Walk a file tree asynchronously. This function returns a promise.

```js
const pedestrian = require('pedestrian');

pedestrian.walk('dir').then(files => {

}, err => {

});
```

Or to get only particular files, pass one or more glob patterns as the second argument.

```js
pedestrian.walk('dir', '**/*.js').then(files => {

});

// or

pedestrian.walk('dir', ['*.js', '*.coffee']).then(files => {

});
```

Negative globs are also supported.

```js
pedestrian.walk('dir', ['**/*.js', '!**/foo.js']).then(files => {

});
```

#### walkSync(directory[, patterns])

The api for `walkSync` is the same as for `walk`, but instead of returning a promise, it returns the array of files.

```javascript
let files = pedestrian.walkSync('lib');
```

## N.B.

Both the sync and async versions  work with either absolute or relatives paths. Relative paths should be relative to the caller, rather than the current working directory. The files that `pedestrian` returns will always be absolute paths, however.

See [minimatch](https://github.com/isaacs/minimatch) for more on the kinds of patterns you can use.

## Contributing

Please see [the contribution guidelines](CONTRIBUTING.md).
