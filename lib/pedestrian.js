const { difference, union } = require('lodash');
const async = require('async');
const minimatch = require('minimatch');
const kindly = require('kindly');
const path = require('path');
const callerId = require('caller-id');

const match = (dir, patterns, files) => {
  return patterns.reduce((results, pattern) => {
    if (pattern.indexOf('!') === 0) {
      return difference(results, minimatch.match(results, `${dir}/${pattern.slice(1)}`));
    } else {
      return union(results, minimatch.match(files, `${dir}/${pattern}`));
    }
  }, []);
};

const arrayify = (thing) => Array.isArray(thing) || thing === null || thing === undefined ? thing : [thing];

const isAbsolute = dir => dir.charAt(0) === '/';

const resolve = (caller, dir) => {
  if (isAbsolute(dir)) {
    return dir;
  } else {
    let dirname = path.dirname(caller.filePath);
    return path.resolve(dirname, dir);
  }
};

const wrap = (fn) => {
  return (dir, patterns) => {
    let caller = callerId.getData();
    dir = resolve(caller, dir);
    patterns = arrayify(patterns);
    return fn(dir, patterns);
  };
};

exports.walk = wrap((dir, patterns) => {
  const walk = (paths, done) => {
    async.reduce(paths, [], (memo, dir, next) => {
      kindly.get(dir).then(({ files, directories }) => {
        memo = memo.concat(files);
        if (directories.length) {
          walk(directories, (err, files) => next(null, memo.concat(files)), next);
        } else {
          next(null, memo);
        }
      }, next);
    }, done);
  };

  return new Promise((resolve, reject) => {
    walk([dir], (err, files) => {
      if (err) {
        reject(err);
      } else {
        if (patterns && patterns.length) {
          files = match(dir, patterns, files);
        }

        resolve(files);
      }
    });
  });
});

exports.walkSync = wrap((dir, patterns) => {
  const walk = (d) => {
    let { files, directories } = kindly.getSync(d);
    return directories.reduce((memo, directory) => memo.concat(walk(directory)), files);
  };

  let files = walk(dir);
  return patterns && patterns.length ? match(dir, patterns, files) : files;
});
