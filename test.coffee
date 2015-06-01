ipLocation  = require './'
assert      = require 'assert'

ipLocation '156.77.54.32', (err, res) ->
  if err
    throw err
  else
    assert typeof res is 'object'
    console.dir res
    console.log 'Test pass'
