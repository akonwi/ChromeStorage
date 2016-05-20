'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var version = { value: '0.0.4' };

exports['default'] = function () {
  var type = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var _chrome = chrome;
  var runtime = _chrome.runtime;

  var storage = null;

  if (type === null) throw new Error("Please specify which type of storage to use. (local or sync)");
  if (type === "local") storage = chrome.storage.local;else if (type === "sync") storage = chrome.storage.sync;

  var ChromeStorage = {};
  Object.defineProperties(ChromeStorage, {
    _VERSION: version,

    /**
    * @param callback to run when data changes
    *   function(changes) {}
    */
    onChange: {
      value: function value(listener) {
        chrome.storage.onChanged.addListener(listener);
      }
    },

    /**
    * @param callback to remove from data changes
    */
    unsubscribe: {
      value: function value(listener) {
        chrome.storage.onChanged.removeListener(listener);
      }
    },

    /**
    * Save something
    *
    * @param key String key name
    * @param val Any object to save with key
    */
    set: {
      value: function value(key, val) {
        var toSave = _defineProperty({}, key, val);
        return new Promise(function (resolve, reject) {
          storage.set(toSave, function () {
            if (runtime.lastError) return reject(runtime.lastError);
            resolve(val);
          });
        });
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
      value: function value(key) {
        return new Promise(function (resolve, reject) {
          storage.get(key, function (results) {
            if (runtime.lastError) return reject(runtime.lastError);
            resolve(results);
          });
        });
      }
    },

    /**
    * Retrieve total collection
    *
    * resolves to an object with key/value pairs
    */
    all: {
      value: function value() {
        return new Promise(function (resolve, reject) {
          storage.get(null, function (items) {
            if (runtime.lastError) return reject(runtime.lastError);
            resolve(items);
          });
        });
      }
    },

    /**
    * Delete data at a key
    *
    * @param key String of key
    */
    remove: {
      value: function value(key) {
        if (key === undefined) throw new Error("No keys given to remove");
        return new Promise(function (resolve, reject) {
          storage.remove(key, function () {
            if (runtime.lastError) return reject(runtime.lastError);
            resolve();
          });
        });
      }
    }
  });
  return Object.preventExtensions(ChromeStorage);
};

module.exports = exports['default'];
//# sourceMappingURL=chrome-storage.js.map
