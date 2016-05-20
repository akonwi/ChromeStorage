#ChromeStorage

A straightforward, promise-based API for working with storage in Chrome extensions.

Just drop in the `src/index.js` file into your project and transpile it into es5. If you're not using es6, the vanilla js version is in the `dist/` folder.

### Constructor function
The default export is a constructor function. It takes one argument, which persistence to use ("local" or "sync")

###Examples:
``` javascript
import ChromeStorage from '../lib/chrome-storage'

const store = ChromeStorage('sync')

store.set('name', 'akonwi').then(function() {
  // continue...
})

store.get('name').then(function(name) {
  console.log("my name is", name)
})

store.all().then(function(data) {
  console.log("my name is", data.name)
})

let promise = store.remove('name').then(function() {
  // continue..
})
promise.catch(function(error) {
  console.error(error)
})
```

If for some reason you need to extend the storage object, you'll have to use `Object.create(storage)`
because each instance of ChromeStorage is immutable.
