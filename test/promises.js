'use strict'

/* global describe, it */

var ipLocation = require('../')
var assert = require('assert')

function randomInt () {
  return Math.round(Math.random() * 255)
}

function randomIp () {
  return randomInt() + '.' +
    randomInt() + '.' +
    randomInt() + '.' +
    randomInt()
}

for (var i = 0; i < 10; i++) {
  describe('try random ips', function () {
    var ip = randomIp()
    it('ip address: ' + ip, function (done) {
      ipLocation(ip)
        .then(function (res) {
          assert(typeof res === 'object')
          assert(res.ip)
          setTimeout(done, 1000)
        })
        .catch(function (err) {
          assert(err)
          done()
        })
    })
  })
}
