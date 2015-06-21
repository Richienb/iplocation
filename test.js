'use strict'

var ipLocation = require('./')
var assert = require('assert')

ipLocation('156.77.54.32', function (err, res) {
  if (err) throw err
  assert(typeof res === 'object')
  console.dir(res)
  console.log('Test pass')
})
