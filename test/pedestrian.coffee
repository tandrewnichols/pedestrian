require "should"
Pedestrian = require "./../lib/pedestrian"
global.context = global.describe

describe "pedestrian", ->
  describe "~ require", ->
    pedestrian = new Pedestrian()
    it "should return an instance of Pedestrian", ->
      pedestrian.should.be.an.instanceOf Pedestrian
      pedestrian.should.have.property('walk').and.obj.should.be.a.Function
      pedestrian.should.have.property('emit').and.obj.should.be.a.Function

    context "with no global options", ->
      it "should have the default options", ->
        pedestrian._options.should.eql
          async: true

    context "with global optoins", ->
      it "should have custom options", ->
        pedestrian = new Pedestrian async: false
        pedestrian._options.should.eql
          async: false

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
