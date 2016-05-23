var test = require('tape')
require('./mock')
var ChromeStorage = require('../dist/chrome-storage')
var create = ChromeStorage.create

test("Create function throws an error if a persistence is not specified", function(t) {
  t.throws(create)
  t.end()
})

test("ChromeStorage instance", function(t) {
  t.plan(4)
  var storage = create(ChromeStorage.LOCAL)

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
  var storage = create(ChromeStorage.LOCAL)
  var other = create(ChromeStorage.LOCAL)

  other.get = new Function()
  other.set = new Function()
  other.all = new Function()
  other.remove = new Function()

  t.deepEqual(storage, other, "The different instances are still equal")
  t.end()
})

test("ChromeStorage allows subscriptions to changes", function(t) {
  var storage = create(ChromeStorage.LOCAL)
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
