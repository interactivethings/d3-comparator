var vows = require('vows'),
    assert = require('assert');

d3 = require('d3');

var comparator = require("../d3-comparator.js");

vows.describe('d3.comparator').addBatch({
  'd3.comparator' : {
    topic: function() { return d3.comparator; },
    'does not sort if no dimension is set': function(comparator) {
      var c = comparator();

      var data = [1, 3, 2].sort(c);

      assert.deepEqual(data, [1, 3, 2]);
    },
    'sorts without accessor': function(comparator) {
      var c = comparator()
        .order(d3.ascending);

      var data = [1, 3, 2].sort(c);

      assert.deepEqual(data, [1, 2, 3]);
    },
    'sorts with accessor': function(comparator) {
      var c = comparator()
        .order(d3.ascending, function(d) { return d.value});

      var data = [
        {value: 1},
        {value: 3},
        {value: 2}
      ].sort(c);

      assert.deepEqual(data, [
        {value: 1},
        {value: 2},
        {value: 3}
      ]);
    },
    'sorts on multiple dimensions, prioritized by order': function(comparator) {
      var c = comparator()
        .order(d3.descending, function(d) { return d.id})
        .order(d3.ascending, function(d) { return d.value});

      var data = [
        {id: "a", value: 1},
        {id: "b", value: 3},
        {id: "b", value: 2}
      ].sort(c);

      assert.deepEqual(data, [
        {id: "b", value: 2},
        {id: "b", value: 3},
        {id: "a", value: 1}
      ]);
    }
  }
}).export(module);