require "should"
Pedestrian = require "./../lib/pedestrian"
global.context = global.describe

describe "pedestrian", ->

  describe "~ require", ->
    beforeEach ->
      @pedestrian = new Pedestrian()

    it "should return an instance of Pedestrian", ->
      @pedestrian.should.be.an.instanceOf Pedestrian
      @pedestrian.walk.should.be.a.Function

    context "with no global options", ->
      it "should have the default options", ->
        @pedestrian._options.should.eql
          async: false

    context "with global optoins", ->
      it "should have custom options", ->
        @pedestrian = new Pedestrian async: true
        @pedestrian._options.should.eql
          async: true

  describe "#walk", ->
    pedestrian = new Pedestrian()
    context "with no options passed", ->
      it "should have default options", ->
        pedestrian.walk 'some/dir'
        pedestrian._options.should.eql
          async: true
    context "with options passed", ->
      it "should have custom option", ->
        pedestrian.walk 'some/dir', async: false
        pedestrian._options.should.eql
          async: false
