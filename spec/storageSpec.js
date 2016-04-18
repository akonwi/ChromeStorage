var storage = ChromeStorage("local")

describe("ChromeStorage", function() {
  describe("subscription", function() {
    beforeEach(function(done) {
      chrome.storage.local.set({ test: 'akonwi' }, done)
    })
    it("change events can be listened to", function(done) {
      var _done = function () {
        done()
        chrome.storage.onChanged.removeListener(listener)
      }
      var listener = function(changes) {
        expect(changes.test).toBeTruthy()
        expect(changes.test.oldValue).toBe('akonwi')
        expect(changes.test.newValue).toBe('akon')
        _done()
      }
      storage.onChange(listener)
      storage.set('test', 'akon')
    })

    it("a listener can stop listening to change events", function(done) {
      var listener = {
        listen: function(changes) {
          expect(true).toBeTruthy()
        }
      }
      spyOn(listener, 'listen')
      storage.onChange(listener.listen)
      storage.unsubscribe(listener.listen)
      storage.remove('test')
      .then(function() {
        expect(listener.listen).not.toHaveBeenCalled()
        done()
      })
    })
  })

  describe("it's methods", function() {
    it("::set returns a promise", function(done) {
      storage.set('name', 'akonwi').then(function(obj) {
        expect(true).toBeTruthy()
        done()
      })
    })

    it("::get returns a promise", function(done) {
      storage.get('name').then(function(value) {
        expect(value).toBe('akonwi')
        done()
      })
    })

    it("::all returns a promise", function(done) {
      storage.set('age', 22).then(function() {
        return storage.all()
      }).then(function(data) {
        expect(data.name).toBe('akonwi')
        expect(data.age).toEqual(22)
        done()
      })
    })

    it("::remove returns a promise", function(done) {
      storage.remove('age').then(function() {
        return storage.get('age')
      }).then(function(value) {
        expect(value).toBeFalsy()
        done()
      })
    })

    it("::remove throws an error when given empty params", function() {
      expect(storage.remove).toThrowError("No keys given to remove")
    })
  })

  describe("its immutability", function() {
    it("can't be extended with new properties", function(){
      storage.newAttribute = 'hey there'
      expect(storage.newAttribute).toBeUndefined()
    })

    it("has an immutable ::set method", function(done) {
      storage.set = function() { return 'foobar' }
      storage.set('name', 'immutable').then(function() {
        expect(true).toBeTruthy()
        done()
      })
    })

    it("has an immutable ::get method", function(done) {
      storage.get = function() { return 'foobar' }
      storage.get('name').then(function(value) {
        expect(value).toBe('immutable')
        done()
      })
    })

    it("has an immutable ::all method", function(done) {
      storage.all = function() { return 'foobar' }
      storage.all().then(function(data) {
        expect(data.name).toBe('immutable')
        done()
      })
    })

    it("has an immutable ::remove method", function(done) {
      storage.remove = function() { return 'foobar' }
      storage.remove('name').then(function() {
        expect(true).toBeTruthy()
        done()
      })
    })
  })
})
