# iplocation [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/iplocation/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/iplocation)

Get ip location information.

[![NPM Badge](https://nodei.co/npm/iplocation.png)](https://npmjs.com/package/iplocation)

## Install

```sh
npm install iplocation
```

## Usage

```js
const ipLocation = require("ip-location");

(async () => {
	await ipLocation("172.217.167.78");
	//=> { latitude: -33.8591, longitude: 151.2002, region: { name: "New South Wales" ... } ... }
})();
```

## API

### ipLocation(ip)

#### ip

Type: `string`

The ipv4 address to get the information for.

## Related

- [iplocation-cli](https://github.com/Richienb/iplocation-cli) - CLI for this module.
