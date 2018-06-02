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
        try {
          assert(!err)
          assert(typeof res === 'object')
          assert(res.ip)
          setTimeout(done, 1000)
        } catch (err) {
          done(err)
        }
      })
    })
  })
})

describe('too many arguments', function () {
  var ip = randomIp()
  it('ip address: ' + ip, function () {
    try {
      ipLocation(ip, [], [], function () {})
    } catch (err) {
      assert(err)
    }
  })
})

describe('implicit (no) ip address', function () {
  it('return data about requesting client', function (done) {
    ipLocation(function (err, res) {
      try {
        assert(!err)
        assert(typeof res === 'object')
        assert(res.ip)
        setTimeout(done, 1000)
      } catch (err) {
        assert(err)
      }
    })
  })
})
