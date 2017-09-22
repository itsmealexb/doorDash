# urlpattern

Parse and transform URL patterns.

## Install

    $ npm install urlpattern

## Usage

#### Express-style Patterns

Parse a pattern into a RegExp, and its constituent placeholders.

```javascript
var pattern = require('urlpattern').express;

var placeholders = [];
var regexp = pattern.parse('/user/:id', placeholders);
```

Subsitute variables into a pattern.

```javascript
var pattern = require('urlpattern').express;

pattern.transform('/user/:id', { id: '1234' });
// => '/user/1234'
```

## Tests

    $ npm install
    $ npm test

[![Build Status](https://secure.travis-ci.org/jaredhanson/node-urlpattern.png)](http://travis-ci.org/jaredhanson/node-urlpattern)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
