#ChromeStorage

A straightforward, promise-based API for working with storage in Chrome extensions.

Just drop in the `src/index.js` file into your project and transpile it into es5

###Examples:
``` javascript
import ChromeStorage from '../lib/chrome-storage'

ChromeStorage.set('name', 'akonwi').then(function() {
  // continue...
})

ChromeStorage.get('name').then(function(name) {
  console.log("my name is", name)
})

ChromeStorage.all().then(function(data) {
  console.log("my name is", data.name)
})

var promise = ChromeStorage.remove('name').then(function() {
  // continue..
})
promise.catch(function(error) {
  console.error(error)
})
```

If for some reason you need to extend the ChromeStorage object, you'll have to use `Object.create(ChromeStorage)`
because ChromeStorage is immutable.
