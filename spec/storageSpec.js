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
    it("::set returns a promise", function() {
      expect(storage.set('name', 'akonwi').then).toBeDefined()
    })

    it("::get returns a promise", function() {
      expect(storage.get('name').then).toBeDefined()
    })

    it("::all returns a promise", function() {
      expect(storage.set('age', 22).then).toBeDefined()
    })

    it("::remove returns a promise", function() {
      expect(storage.remove('age').then).toBeDefined()
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

    it("has an immutable ::set method", function() {
      var set = function() { return 'foobar' }
      storage.set = set
      expect(storage.set === set).toBe(false)
    })

    it("has an immutable ::get method", function() {
      var get = function() { return 'foobar' }
      storage.get = get
      expect(storage.get === get).toBe(false)
    })

    it("has an immutable ::all method", function() {
      var all = function() { return 'foobar' }
      storage.all = all
      expect(storage.all === all).toBe(false)
    })

    it("has an immutable ::remove method", function() {
      var remove = function() { return 'foobar' }
      storage.remove = remove
      expect(storage.remove === remove).toBe(false)
    })
  })
})
