describe('pedestrian', () => {
  let pedestrian = require('../lib/pedestrian');
  let path = `${__dirname}/fixtures`;
  let split = file => file.split('pedestrian/test/fixtures/')[1];
  
  describe('.walkSync', () => {
    context('without files', () => {
      it('should return all files', () => {
        let files = pedestrian.walkSync(path).map(split);
        files.should.eql(['bar.js', 'foo.coffee', 'foo.js', 'baz/quux.coffee', 'baz/quux.js']);
      })
    })

    context('with filters', () => {
      context('one level', () => {
        it('should return matching files', () => {
          let files = pedestrian.walkSync(path, ['*.js']).map(split);
          files.should.eql(['bar.js', 'foo.js']);
        })
      })

      context('nested levels', () => {
        it('should return matching files', () => {
          let files = pedestrian.walkSync(path, ['**/*.js']).map(split);
          files.should.eql(['bar.js', 'foo.js', 'baz/quux.js']);
        })
      })

      context('with files disabled', () => {
        it('should not return escaped files', () => {
          let files = pedestrian.walkSync(path, ['**/*.js', '!foo.js']).map(split);
          files.should.eql(['bar.js', 'baz/quux.js']);
        })
      })

      context('complicated patterns', () => {
        it('should return the approporiate files', () => {
          let files = pedestrian.walkSync(path, ['**/*.js', '**/*.coffee', '!**/foo.*']).map(split);
          files.should.eql(['bar.js', 'baz/quux.js', 'baz/quux.coffee']);
        })
      })

      context('with a simple string', () => {
        it('should return matching files', () => {
          let files = pedestrian.walkSync(path, '**/*.js').map(split);
          files.should.eql(['bar.js', 'foo.js', 'baz/quux.js']);
        })
      })

      context('with a null pattern', () => {
        it('should return all the files', () => {
          let files = pedestrian.walkSync(path, null).map(split);
          files.should.eql(['bar.js', 'foo.coffee', 'foo.js', 'baz/quux.coffee', 'baz/quux.js']);
        })
      })

      context('with an undefined pattern', () => {
        it('should return all the files', () => {
          let files = pedestrian.walkSync(path, undefined).map(split);
          files.should.eql(['bar.js', 'foo.coffee', 'foo.js', 'baz/quux.coffee', 'baz/quux.js']);
        })
      })
    })

    context('relative path', () => {
      context('without filters', () => {
        it('should return all files', () => {
          let files = pedestrian.walkSync('fixtures').map(split);
          files.should.eql(['bar.js', 'foo.coffee', 'foo.js', 'baz/quux.coffee', 'baz/quux.js']);
        })
      })

      context('with filters', () => {
        it('should return all files', () => {
          let files = pedestrian.walkSync('fixtures', ['*.js']).map(split);
          files.should.eql(['bar.js', 'foo.js']);
        })
      })
    })
  })

  describe('async', () => {
    context('without filters', () => {
      it('should return all files', () => {
        return pedestrian.walk(path).then((files) => {
          files = files.map(split);
          files.should.eql(['bar.js', 'foo.coffee', 'foo.js', 'baz/quux.coffee', 'baz/quux.js']);
        })
      })
    })

    context('with filters', () => {
      context('one level', () => {
        it('should return matching files', () => {
          return pedestrian.walk(path, ['*.js']).then((files) => {
            files = files.map(split);
            files.should.eql(['bar.js', 'foo.js']);
          });
        })
      })

      context('nested levels', () => {
        it('should return matching files', () => {
          return pedestrian.walk(path, ['**/*.js']).then((files) => {
            files = files.map(split);
            files.should.eql(['bar.js', 'foo.js', 'baz/quux.js']);
          });
        })
      })

      context('with files disabled', () => {
        it('should not return escaped files', () => {
          return pedestrian.walk(path, ['**/*.js', '!foo.js']).then((files) => {
            files = files.map(split);
            files.should.eql(['bar.js', 'baz/quux.js']);
          });
        })
      })

      context('complicated patterns', () => {
        it('should return the approporiate files', () => {
          return pedestrian.walk(path, ['**/*.js', '**/*.coffee', '!**/foo.*']).then((files) => {
            files = files.map(split);
            files.should.eql(['bar.js', 'baz/quux.js', 'baz/quux.coffee']);
          });
        })
      })

      context('with a simple string', () => {
        it('should return matching files', () => {
          return pedestrian.walk(path, '**/*.js').then((files) => {
            files = files.map(split);
            files.should.eql(['bar.js', 'foo.js', 'baz/quux.js']);
          });
        })
      })

      context('with a null pattern', () => {
        it('should return all the files', () => {
          return pedestrian.walk(path, null).then((files) => {
            files = files.map(split);
            files.should.eql(['bar.js', 'foo.coffee', 'foo.js', 'baz/quux.coffee', 'baz/quux.js']);
          });
        })
      })

      context('with an undefined pattern', () => {
        it('should return all the files', () => {
          return pedestrian.walk(path, undefined).then((files) => {
            files = files.map(split);
            files.should.eql(['bar.js', 'foo.coffee', 'foo.js', 'baz/quux.coffee', 'baz/quux.js']);
          });
        })
      })
    })

    context('relative path', () => {
      context('without filters', () => {
        it('should return all files', () => {
          return pedestrian.walk('fixtures').then((files) => {
            files = files.map(split);
            files.should.eql(['bar.js', 'foo.coffee', 'foo.js', 'baz/quux.coffee', 'baz/quux.js']);
          });
        })
      })

      context('with filters', () => {
        it('should return all files', () => {
          return pedestrian.walk('fixtures', ['*.js']).then((files) => {
            files = files.map(split);
            files.should.eql(['bar.js', 'foo.js']);
          });
        })
      })
    })

    context('error handling', () => {
      const kindly = require('kindly');
      const sinon = require('sinon');

      beforeEach(() => {
        let get = sinon.stub(kindly, 'get');
        get.callsFake(() => Promise.reject('An error'));
      })

      afterEach(() => {
        kindly.get.restore();
      })

      it('should return the error', () => {
        return pedestrian.walk('fixtures').catch(err => {
          err.should.eql('An error');
        });
      })
    })
  })
})
