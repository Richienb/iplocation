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
  describe('(callbacks) try random ips', function () {
    var ip = randomIp()
    it('ip address: ' + ip, function (done) {
      ipLocation(ip, function (err, res) {
        try {
          assert(!err)
          assert(typeof res === 'object')
          assert(res.ip)
          setTimeout(done, 1000)
        } catch (err) {
          assert(err)
          done()
        }
      })
    })
  })
}
