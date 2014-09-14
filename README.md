# iplocation

[![NPM](https://nodei.co/npm-dl/iplocation.png?months=6)](https://nodei.co/npm/iplocation/)

### Overview

Get IP location information using the [freegeoip.net](http://freegeoip.net) service.

__Please consider donating to the service if you use it a lot. Also see [https://github.com/fiorix/freegeoip](https://github.com/fiorix/freegeoip) for more info.__

### Installation

```
$ npm install iplocation
```

### Usage

```javascript
var iplocation = require('iplocation');

iplocation.get('56.70.97.8', function (res) {

  /*

  { ip: '56.70.97.8',
  country_code: 'US',
  country_name: 'United States',
  region_code: 'NC',
  region_name: 'North Carolina',
  city: 'Raleigh',
  zipcode: '27668',
  latitude: 35.7977,
  longitude: -78.6253,
  metro_code: '560',
  area_code: '919' }

  */

});
```

__Caching__

Results are cached in an object as soon as a response is received so over time requests are minimised as repeated IP addresses are seen.

You can clear the object using the below:

```javascript
iplocation.clearCache();
```

You can also check the side of the cache or view the cache, using:

```javascript
iplocation.cacheSize();

iplocation.cache();
```

### Caveats

* only supports IPv4
* freegeoip.net's limit is 10,000 requests per hour
