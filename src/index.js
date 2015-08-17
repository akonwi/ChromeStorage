'use strict'
const storage = chrome.storage.sync
const {runtime} = chrome

let ChromeStorage = {}
Object.defineProperties(ChromeStorage, {
  _VERSION: {
    value: '0.0.3'
  },

  /**
   * @param callback to run when data changes
   *   function(changes) {}
   */
  onChange: {
    value(listener) {
      chrome.storage.onChanged.addListener(listener)
    }
  },

  /**
   * @param callback to remove from data changes
   */
  unsubscribe: {
    value(listener) {
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
    value(key, val) {
      let toSave = { [key]: val }
      return new Promise((resolve, reject) => {
        storage.set(toSave, () => {
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
    value(key) {
      return new Promise((resolve, reject) => {
        storage.get(key, (results) => {
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
    value() {
      return new Promise((resolve, reject) => {
        storage.get(null, (items) => {
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
    value(key) {
      if (key === undefined)
        throw new Error("No keys given to remove")
      return new Promise((resolve, reject) => {
        storage.remove(key, () => {
          if (runtime.lastError)
            return reject(runtime.lastError)
          resolve()
        })
      })
    }
  }
})
Object.preventExtensions(ChromeStorage)

export default ChromeStorage
