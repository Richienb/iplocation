# iplocation [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/iplocation/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/iplocation)

Get ip location information.

[![NPM Badge](https://nodei.co/npm/iplocation.png)](https://npmjs.com/package/iplocation)

## Install

```sh
npm install iplocation
```

## Usage

```js
const ipLocation = require("iplocation");

// using the free tier of ipapi
(async () => {
	await ipLocation("172.217.167.78");
	//=> { latitude: -33.8591, longitude: 151.2002, region: { name: "New South Wales" ... } ... }
})();

// using the paid tier of ipapi
(async () => {
	await ipLocation("172.217.167.78", { apiKey: 'YOUR_API_KEY'});
	//=> { latitude: -33.8591, longitude: 151.2002, region: { name: "New South Wales" ... } ... }
})();
```

## API

### ipLocation(ip, options?)

#### ip

Type: `string`

The ipv4 address to get the information for.

#### options

Type: `object`

#### apiKey

Type: `string`

The api key for the paid version of [ipapi](https://ipapi.co/pricing/?utm_source=google&utm_term=ipapi&utm_campaign=10951547418&adgroupid=109238001284&device=c&utm_medium=cpc&utm_content=459469000491&gclid=Cj0KCQjwiNSLBhCPARIsAKNS4_dAe4tHfaLyWSQSqp0kZUnZBrhTkldv5cRYLMqH_XinJuyuJ8Dplg0aAmrsEALw_wcB).

## Providers

iplocation currently uses [ipapi](https://ipapi.co/) for IP lookups. Their free API is limited to 1000 requests per day.

## Related

- [iplocation-cli](https://github.com/Richienb/iplocation-cli) - CLI for this module.
