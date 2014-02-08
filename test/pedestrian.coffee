describe "pedestrian", ->
  Given -> @kindly = spyObj('get')
  Given -> @subject = sandbox "lib/pedestrian",
    "kindly": @kindly

  describe ".walk", ->
    context 'sync', ->
      context 'no filter', ->
        Given -> @kindly.get.withArgs("/dir").returns
          files: ["/dir/foo.txt"]
          directories: ["/dir/bar"]
        Given -> @kindly.get.withArgs("/dir/bar").returns
          files: ["/dir/bar/baz.txt"],
          directories: []
        When -> @result = @subject.walk("/dir")
        Then -> expect(@result).to.eql [ '/dir/foo.txt', '/dir/bar/baz.txt' ]

      context 'with one filter', ->
        Given -> @kindly.get.withArgs('/dir').returns
          files: ['/dir/foo.css', '/dir/foo.js']
          directories: ['/dir/bar']
        Given -> @kindly.get.withArgs('/dir/bar').returns
          files: ['/dir/bar/baz.css', '/dir/bar/baz.js']
        When -> @result = @subject.walk('/dir', '**/*.js')
        Then -> expect(@result).to.eql [ '/dir/foo.js', '/dir/bar/baz.js' ]

      context 'with several filters', ->
        Given -> @kindly.get.withArgs('/dir').returns
          files: ['/dir/foo.css', '/dir/foo.js', '/dir/baz.coffee']
          directories: ['/dir/bar']
        Given -> @kindly.get.withArgs('/dir/bar').returns
          files: ['/dir/bar/baz.css', '/dir/bar/baz.js']
        Given -> @filters = [ '**/*.js', '**/*.coffee' ]
        When -> @result = @subject.walk('/dir', @filters)
        Then -> expect(@result).to.eql [ '/dir/foo.js', '/dir/bar/baz.js', '/dir/baz.coffee' ]

      context 'with an empty array of filters', ->
        Given -> @kindly.get.withArgs('/dir').returns
          files: ['/dir/foo.css', '/dir/foo.js']
          directories: ['/dir/bar']
        Given -> @kindly.get.withArgs('/dir/bar').returns
          files: ['/dir/bar/baz.css', '/dir/bar/baz.js']
        When -> @result = @subject.walk('/dir', [])
        Then -> expect(@result).to.eql [ '/dir/foo.css', '/dir/foo.js', '/dir/bar/baz.css', '/dir/bar/baz.js' ]

    context 'async', ->
      #context 'no filter', ->
        #Given -> @kindly.get.withArgs("/dir").returns
          #files: ["/dir/foo.txt"]
          #directories: ["/dir/bar"]
        #Given -> @kindly.get.withArgs("/dir/bar").returns
          #files: ["/dir/bar/baz.txt"],
          #directories: []
        #When -> @subject.walk("/dir")
        #Then -> expect(@result).to.eql [ '/dir/foo.txt', '/dir/bar/baz.txt' ]

      #context 'with one filter', ->
        #Given -> @kindly.get.withArgs('/dir').returns
          #files: ['/dir/foo.css', '/dir/foo.js']
          #directories: ['/dir/bar']
        #Given -> @kindly.get.withArgs('/dir/bar').returns
          #files: ['/dir/bar/baz.css', '/dir/bar/baz.js']
        #When -> @result = @subject.walk('/dir', '**/*.js')
        #Then -> expect(@result).to.eql [ '/dir/foo.js', '/dir/bar/baz.js' ]

      #context 'with several filters', ->
        #Given -> @kindly.get.withArgs('/dir').returns
          #files: ['/dir/foo.css', '/dir/foo.js', '/dir/baz.coffee']
          #directories: ['/dir/bar']
        #Given -> @kindly.get.withArgs('/dir/bar').returns
          #files: ['/dir/bar/baz.css', '/dir/bar/baz.js']
        #Given -> @filters = [ '**/*.js', '**/*.coffee' ]
        #When -> @result = @subject.walk('/dir', @filters)
        #Then -> expect(@result).to.eql [ '/dir/foo.js', '/dir/bar/baz.js', '/dir/baz.coffee' ]

      #context 'with an empty array of filters', ->
        #Given -> @kindly.get.withArgs('/dir').returns
          #files: ['/dir/foo.css', '/dir/foo.js']
          #directories: ['/dir/bar']
        #Given -> @kindly.get.withArgs('/dir/bar').returns
          #files: ['/dir/bar/baz.css', '/dir/bar/baz.js']
        #When -> @result = @subject.walk('/dir', [])
        #Then -> expect(@result).to.eql [ '/dir/foo.css', '/dir/foo.js', '/dir/bar/baz.css', '/dir/bar/baz.js' ]
