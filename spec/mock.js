var listeners = []

var data = {}

var set = function(object, cb) {
  var changes = {}
  for (var key in object) {
    changes[key] = {
      oldValue: data[key],
      newValue: object[key]
    }
    data[key] = object[key]
  }
  listeners.forEach(l => l(changes))
  cb()
};

var get = function(k, cb) {
  cb(data)
}

var remove = function(k, cb) {
  delete data[k]
  cb()
}

global.chrome = {
  runtime: {
    lastError: undefined
  },
  storage: {
    local: { set: set, get: get, remove: remove },
    sync: {},
    onChanged: {
      addListener: (listener) => {
        listeners.push(listener)
      },
      removeListener: (listener) => {
        listeners = []
      }
    }
  }
}
