'use strict'

var debug = require('debug')('iplocation')
var ipRegex = require('ip-regex')
var request = require('request')

var defaultProviders = [
  'https://ipapi.co/*/json/',
  'https://freegeoip.net/json/*',
  'http://ip-api.com/json/*'
]

module.exports = function () {
  var args = Array.prototype.slice.apply(arguments)

  if (args.length > 3) {
    throw new TypeError('Too many arguments.')
  }

  var ip = args[0]
  var alternativeProviders = (args[1] && Array.isArray(args[1]))
  var providers = defaultProviders.concat(alternativeProviders || [])

  var callback = alternativeProviders
    ? args[2]
    : args[1]

  if (!ipRegex().test(ip)) {
    var invalidIpError = new Error('Invalid IP address.')
    return callback
      ? callback(invalidIpError, null)
      : Promise.reject(invalidIpError)
  }

  function retry (i, callback) {
    if (!providers[i]) {
      var providerError = new Error('All providers failed.')
      return callback(providerError, null)
    }

    var url = providers[i].replace('*', ip)

    debug('trying: ' + url)

    request.get(url, function (err, response, body) {
      var json

      try {
        debug('got: ' + body)
        json = JSON.parse(body)
      } catch (ex) {
        return retry(++i, callback)
      }

      return callback(err, json)
    })
  }

  if (callback) {
    retry(0, callback)
  } else {
    return new Promise(function (resolve, reject) {
      retry(0, function (err, res) {
        if (err) return reject(err)
        else resolve(res)
      })
    })
  }
}
