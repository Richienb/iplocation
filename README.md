# iplocation [![Build Status](https://travis-ci.org/roryrjb/iplocation.svg?branch=master)](https://travis-ci.org/roryrjb/iplocation) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

### Overview

Get IP location information using [ip-api](http://ip-api.com).

_"Our system will automatically ban any IP addresses doing over 150 requests per minute."_

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
    as: 'AS11286 KeyBank National Association',
    city: 'Cleveland',
    country: 'United States',
    countryCode: 'US',
    isp: 'KeyBank National Association',
    lat: 41.4875,
    lon: -81.6724,
    org: 'KeyBank National Association',
    query: '156.77.54.32',
    region: 'OH',
    regionName: 'Ohio',
    status: 'success',
    timezone: 'America/New_York',
    zip: '44115'
  }

  */

})
```
