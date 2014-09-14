'use strict';

var fetch = require('fetchjson'),
    regex = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
    cache = {},
    sections,
    i;

exports.get = function (ipV4Address, callback) {

  // check ip address format "nnn.nnn.nnn.nnn"
  if (!ipV4Address.match(regex)) {
    throw new Error('ip address was incorrectly formatted');
  }

  // check ip address range
  sections = ipV4Address.split('.');

  for (i = 0; i < sections.length; i++) {
    if (parseInt(sections[i], 10) > 255) {
      throw new Error('format error, each part must not be greater than 255');
    }

    if (i === (sections.length - 1)) {
      if (cache[ipV4Address] === undefined) {
        fetch('http://freegeoip.net/json/' + ipV4Address, function (res) {
          cache[ipV4Address] = res;
          return callback(res);
        });
      } else {
        return callback(cache[ipV4Address]);
      }
    }

  }

};

exports.cacheSize = function () {
  if (Object.keys(cache).length > 0) {
    return JSON.stringify(cache).length;
  }
  return 0;
};

exports.clearCache = function () {
  cache = {};
  return;
};

exports.cache = function () {
  return cache;
};
