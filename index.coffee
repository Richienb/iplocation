ipRegex = require 'ip-regex'
request = require 'request'

module.exports = (ip, callback) ->
  if not ipRegex({exact: true}).test ip
    callback 'Invalid IP address.', null
  else
    request 'http://freegeoip.net/json/' + ip, (err, response, body) ->
      try
        json = JSON.parse body
      catch ex
        callback ex, null
      callback err, json
