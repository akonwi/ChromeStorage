var listeners = []

var d = {}

var set = function(o, cb) {
  var changes = {}
  for (var k in o) {
    changes[k] = {
      oldValue: d[k],
      newValue: o[k]
    }
    d[k] = o[k]
  }
  listeners.forEach(l => l(changes))
  cb()
};

var get = function(k, cb) {
  if (k === null)
    cb(d)
  else
    cb(d[k])
}

var remove = function(k, cb) {
  delete d[k]
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
      addListener: (l) => {
        listeners.push(l)
      },
      removeListener: (l) => {
        listeners = []
      }
    }
  }
}
