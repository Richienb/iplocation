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

describe('additional providers', function () {
  var ip = randomIp()
  describe('no additional providers', function () {
    it('ip address: ' + ip, function (done) {
      ipLocation(ip, [], function (err, res) {
        assert(!err)
        assert(typeof res === 'object')
        assert(res.ip)
        setTimeout(done, 1000)
      })
    })
  })
})

describe('too many arguments', function () {
  var ip = randomIp()
  it('ip address: ' + ip, function () {
    try {
      ipLocation(ip, [], [], function () {})
    } catch (ex) {
      assert(ex)
    }
  })
})
