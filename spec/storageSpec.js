describe("ChromeStorage", function() {
  describe("it's methods", function() {
    it("::set returns a promise", function(done) {
      ChromeStorage.set('name', 'akonwi').then(function(obj) {
        expect(true).toBeTruthy()
        done()
      })
    })

    it("::get returns a promise", function(done) {
      ChromeStorage.get('name').then(function(value) {
        expect(value).toBe('akonwi')
        done()
      })
    })

    it("::all returns a promise", function(done) {
      ChromeStorage.set('age', 22).then(function() {
        return ChromeStorage.all()
      }).then(function(data) {
        expect(data.name).toBe('akonwi')
        expect(data.age).toEqual(22)
        done()
      })
    })

    it("::remove returns a promise", function(done) {
      ChromeStorage.remove('age').then(function() {
        return ChromeStorage.get('age')
      }).then(function(value) {
        expect(value).toBeFalsy()
        done()
      })
    })

    it("::remove throws an error when given empty params", function() {
      expect(ChromeStorage.remove).toThrowError("No keys given to remove")
    })
  })

  describe("its immutability", function() {
    it("can't be extended with new properties", function(){
      ChromeStorage.newAttribute = 'hey there'
      expect(ChromeStorage.newAttribute).toBeUndefined()
    })

    it("has an immutable ::set method", function(done) {
      ChromeStorage.set = function() { return 'foobar' }
      ChromeStorage.set('name', 'immutable').then(function() {
        expect(true).toBeTruthy()
        done()
      })
    })

    it("has an immutable ::get method", function(done) {
      ChromeStorage.get = function() { return 'foobar' }
      ChromeStorage.get('name').then(function(value) {
        expect(value).toBe('immutable')
        done()
      })
    })

    it("has an immutable ::all method", function(done) {
      ChromeStorage.all = function() { return 'foobar' }
      ChromeStorage.all().then(function(data) {
        expect(data.name).toBe('immutable')
        done()
      })
    })

    it("has an immutable ::remove method", function(done) {
      ChromeStorage.remove = function() { return 'foobar' }
      ChromeStorage.remove('name').then(function() {
        expect(true).toBeTruthy()
        done()
      })
    })
  })
})
