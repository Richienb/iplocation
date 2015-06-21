# iplocation [![Build Status](https://travis-ci.org/roryrjb/iplocation.svg?branch=master)](https://travis-ci.org/roryrjb/iplocation) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

### Overview

Get IP location information using the [freegeoip.net](http://freegeoip.net) service.

__Please consider donating to the service if you use it a lot. Also see [https://github.com/fiorix/freegeoip](https://github.com/fiorix/freegeoip) for more info.__

### Installation

```
$ npm install iplocation
```

### Usage

```javascript
var iplocation = require('iplocation')

iplocation('56.70.97.8', function (error, res) {

  /* res =>

    {
      ip: '56.70.97.8',
      country_code: 'US',
      country_name: 'United States',
      region_code: 'NC',
      region_name: 'North Carolina',
      city: 'Raleigh',
      zipcode: '27668',
      latitude: 35.7977,
      longitude: -78.6253,
      metro_code: '560',
      area_code: '919'
    }

  */

})
```

### Caveats

* freegeoip.net's limit is _10,000 requests per hour_
