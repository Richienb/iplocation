'use strict'

var ipRegex = require('ip-regex')
var request = require('request')

module.exports = function (ip, callback) {
  if (!ipRegex().test(ip)) {
    return callback('Invalid IP address.', null)
  }
  return request.get('http://freegeoip.net/json/' + ip, function (err, response, body) {
    var json
    try {
      json = JSON.parse(body)
    } catch (ex) {
      return callback(ex, null)
    }
    return callback(err, json)
  })
}
