# d3.comparator

A [D3](http://d3js.org) generator for comparator functions. It can be used to easily sort arrays of objects by one or multiple dimensions.

If you want to sort by a single dimension, you end up writing comparators like `function cmp(a, b) { return a.value - b.value; }` or `function cmp(a, b) { return d3.ascending(a.value, b.value); }`. For sorting by two or more dimensions it gets ugly pretty fast. d3.comparator provides a simple API for generating those comparators.

## API

d3.<b>comparator</b>()

Constructs a new comparator with the default return value 0. I.e. using it will not change sort order.

<b>comparator</b>(<i>a</i>, <i>b</i>)

The comparator can be used with the array sort method.

comparator.<b>order</b>(<i>cmp</i>, [<i>accessor</i>])

Adds a dimension to the comparator. The return value of <i>accessor</i> will be compared with <i>cmp</i> (which has to be a comparator function itself, e.g. d3.ascending). If <i>accessor</i> isn't specified, an identity function `function(d) { return d; }` is used.

Dimensions are compared in order. As soon as <i>cmp</i> returns something other than `0`, subsequent dimensions are ignored.

Example using a single dimension:

```javascript
var cmp = d3.comparator().order(d3.ascending, function(d) { return d.value; });
```

Example using two dimensions, roughly equivalent to SQL `ORDER BY year DESC, value ASC`:

```javascript
var cmp = d3.comparator()
  .order(d3.descending, function(d) { return d.year; })
  .order(d3.ascending, function(d) { return d.value; });
```

<i>Note:</i> These are just comparator functions. To acually sort an array use

```javascript
someArray.sort(cmp);
```

## Author

Jeremy Stucki, [Interactive Things](http://interactivethings.com)

## License

BSD, see LICENSE.txt
