'use strict';

var iplocation = require('../lib');

setTimeout(function () {
  iplocation.get('56.70.97.8', function (res) {
    console.dir(res);
  });

  iplocation.get('56.30.97.97', function (res) {
    console.dir(res);
  });

  iplocation.get('56.3.97.97', function (res) {
    console.dir(res);
  });

  iplocation.get('56.7.97.97', function (res) {
    console.dir(res);
  });
}, 2000);

iplocation.get('97.97.97.97', function (res) {
  console.dir(res);
});

iplocation.get('56.77.97.97', function (res) {
  console.dir(res);
});

iplocation.get('56.71.97.97', function (res) {
  console.dir(res);
});

iplocation.get('56.75.97.97', function (res) {
  console.dir(res);
});

iplocation.get('56.85.97.97', function (res) {
  console.dir(res);
});

iplocation.get('90.70.97.97', function (res) {
  console.dir(res);
});

iplocation.get('6.70.97.97', function (res) {
  console.dir(res);
});

iplocation.get('59.70.97.97', function (res) {
  console.dir(res);
});

iplocation.get('123.70.97.95', function (res) {
  console.dir(res);
});

iplocation.get('56.69.97.97', function (res) {
  console.dir(res);
});

setTimeout(function () {
  console.log(iplocation.cacheSize());
}, 2000);

setTimeout(function () {
  iplocation.clearCache();
}, 4000);

setTimeout(function () {
  console.log(iplocation.cacheSize());
}, 8000);