# iplocation

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![License][license-image]][license-url]
[![Code style][standard-image]][standard-url]

> Get IP location information using various providers.

### Installation

```
$ npm install iplocation
```

...or:

```
$ yarn add iplocation
```

### Usage

__iplocation([ip], [providers], [callback])__

__Providers:__

Supply additional providers in the following format:

```
https://domain-name.tld/json/*
https://domain-name.tld/*/json
https://domain-name.tld/?ip=*&format=json
```

Basically wherever the API requires the IP address put a `*` and the module
will replace it with the IP address entered as arguments.

You can ommit the IP address parameter to return data for the ip address of the requesting client, (in a server environment this will be the server public IP address, in a browser this will be the clients public IP address).


__Callback:__

If you omit the callback argument, the function will return a promise.

__Providers:__

This module will try providers _in order_, moving onto then next provider if the request fails. If provided, additional providers will be tried first, if the all additional providers fail or none are provided then the following defaults are tried _in order_.

* https://freegeoip.net/
* https://ipapi.co/

You won't get anything if __all__ providers fail.

__Callbacks:__

```javascript
var iplocation = require('iplocation')

iplocation('56.70.97.8', function (error, res) {

  /* res:

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

__Promises:__

```javascript
var iplocation = require('iplocation')

iplocation('56.70.97.8')
  .then(res => {

    /* res:

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
  .catch(err => {
    console.error(err)
  })
```

### See Also

[`iplocation-cli`](https://github.com/roryrjb/iplocation-cli) - this module as a command line app.

[npm-image]: https://img.shields.io/npm/v/iplocation.svg
[npm-url]: https://npmjs.org/package/iplocation
[travis-image]: https://img.shields.io/travis/roryrjb/iplocation.svg
[travis-url]: https://travis-ci.org/roryrjb/iplocation
[license-image]: http://img.shields.io/npm/l/iplocation.svg
[license-url]: LICENSE
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: https://github.com/feross/standard
