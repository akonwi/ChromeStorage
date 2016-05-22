var test = require('tape')
require('./mock')
var ChromeStorage = require('../dist/chrome-storage')

test("Constructor function throws an error if a persistence is not specified", function(t) {
  t.throws(ChromeStorage)
  t.end()
})

test("ChromeStorage instance", function(t) {
  t.plan(4)
  var storage = ChromeStorage('local')

  storage.set('foo', 'bar').then(function() {
    t.pass("::set method returns a promise")
    return storage.get('foo')
  })
  .then(function(value) {
    t.is(value, 'bar', "::get method promises a value")
    return storage.all()
  })
  .then(function(data) {
    t.deepEquals(data, {foo: 'bar'}, "::all method promises everything")
    return storage.remove('foo')
  })
  .then(function() {
    t.pass("::remove method returns a promise")
  })

})

test("ChromeStorage immutability", function(t) {
  var storage = ChromeStorage('local')
  var other = ChromeStorage('local')

  other.get = new Function()
  other.set = new Function()
  other.all = new Function()
  other.remove = new Function()

  t.deepEqual(storage, other, "The different instances are still equal")
  t.end()
})

test("ChromeStorage allows subscriptions to changes", function(t) {
  var storage = ChromeStorage('local')
  t.plan(1)

  var expectedChanges = {
    name: {
      oldValue: undefined,
      newValue: 'akonwi'
    }
  }
  var listener = function(changes) {
    t.deepEquals(changes, expectedChanges, "listener was called with changes")
  }

  storage.onChange(listener)
  storage.set('name', 'akonwi')

  storage.unsubscribe(listener)
  storage.set('name', 'akonwi')
})
