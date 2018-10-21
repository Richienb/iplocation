# iplocation

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![License][license-image]][license-url]

> Get IP location information using various providers. ES module/Typescript support.

### Installation

```
$ npm install --save iplocation
```

### Usage

__Importing:__

CommonJS:

```javascript
const iplocation = require("iplocation").default;
```

__Breaking change (`>= v6.0.0`):__ `.default` is now required when using __CommonJS__ `require`.

ES modules/Typescript:

```javascript
import iplocation from "iplocation";
```

__Callback:__ `iplocation(ip, providers, callback)`

__Promise:__ `iplocation(ip, [providers])`

__Providers:__

Supply additional providers in the following format:

```
https://domain-name.tld/json/*
https://domain-name.tld/*/json
https://domain-name.tld/?ip=*&format=json
```

Basically wherever the API requires the IP address put a `*` and the module
will replace it with the IP address entered as arguments.

You can omit the IP address parameter to return data for the ip address of the requesting client, (in a server environment this will be the server public IP address, in a browser this will be the clients public IP address).

__Providers:__

This module will try providers _in order_, moving onto then next provider if the request fails. If provided, additional providers will be tried first, if the all additional providers fail or none are provided then the [hardcoded defaults](https://github.com/roryrjb/iplocation/blob/master/src/index.ts#L6) are tried _in order_. You won't get anything if __all__ providers fail.

__Callback:__

```javascript
const iplocation = require("iplocation").default;

iplocation('56.70.97.8', [], (error, res) => {

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

});
```

__Breaking change (`>= v6.0.0`):__ the additional providers array (even if empty) is required.

__Promise:__

```javascript
const iplocation = require("iplocation").default;

iplocation("56.70.97.8")
    .then((res) => {
    })
    .catch(err => {
    });
```

### See Also

[`iplocation-cli`](https://github.com/roryrjb/iplocation-cli) - this module as a command line app.

[npm-image]: https://img.shields.io/npm/v/iplocation.svg
[npm-url]: https://npmjs.org/package/iplocation
[travis-image]: https://img.shields.io/travis/roryrjb/iplocation.svg
[travis-url]: https://travis-ci.org/roryrjb/iplocation
[license-image]: http://img.shields.io/npm/l/iplocation.svg
[license-url]: LICENSE
