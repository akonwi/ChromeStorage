var test = require('tape')
require('./mock')
var ChromeStorage = require('../dist/chrome-storage')

test("Constructor function throws an error if a persistence is not specified", function(t) {
  t.throws(ChromeStorage)
  t.end()
})

test("ChromeStorage instance", function(t) {
  var storage = ChromeStorage('local')

  t.ok(storage.get('foo').then.call, "get method returns a promise")
  t.ok(storage.set('foo', 'bar').then.call, "set method returns a promise")
  t.ok(storage.all().then.call, "all method returns a promise")
  t.ok(storage.remove('foo').then.call, "remove method returns a promise")
  t.end()
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
