var storage = chrome.storage.sync
var runtime = chrome.runtime

ChromeStorage = {}
Object.defineProperties(ChromeStorage, {
  _VERSION: {
    value: '0.0.1'
  },
  /**
   * @param callback to run when data changes
   *   function(changes) {}
   */
  onChange: {
    value: function(listener) {
      chrome.storage.onChanged.addListener(listener)
    }
  },
  
  /**
   * @param callback to remove from data changes
   */
  unsubscribe: {
    value: function(listener) {
      chrome.storage.onChanged.removeListener(listener)
    }
  },
  /**
   * Save something
   *
   * @param key String key name
   * @param val Any object to save with key
   */
  set: {
    value: function(key, val) {
      (toSave = {})[key] = val
      return new Promise(function(resolve, reject) {
        storage.set(toSave, function() {
          if (runtime.lastError)
            return reject(runtime.lastError)
          resolve(val)
        })
      })
    }
  },

  /**
   * Retrieve data
   *
   * @param key String of key or Array of keys to retrieve
   *   If given one key, it resolves to just the value
   *   If given an array of keys, it resolves to an object with key/value pairs
   */
  get: {
    value: function(key) {
      return new Promise(function(resolve, reject) {
        storage.get(key, function(results) {
          if (key.trim !== undefined)
            results = results[key]
          if (runtime.lastError)
            return reject(runtime.lastError)
          resolve(results)
        })
      })
    }
  },

  /**
   * Retrieve total collection
   *
   * resolves to an object with key/value pairs
   */
  all: {
    value: function() {
      return new Promise(function(resolve, reject) {
        storage.get(null, function(items) {
          if (runtime.lastError)
            return reject(runtime.lastError)
          resolve(items)
        })
      })
    }
  },

  /**
   * Delete data at a key
   *
   * @param key String of key
   */
  remove: {
    value: function(key) {
      if (key === undefined)
        throw new Error("No keys given to remove")
      return new Promise(function(resolve, reject) {
        storage.remove(key, function() {
          if (runtime.lastError)
            return reject(runtime.lastError)
          resolve()
        })
      })
    }
  }
})
Object.preventExtensions(ChromeStorage)
