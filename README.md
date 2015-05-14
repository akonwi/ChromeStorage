#ChromeStorage

A straightforward, promise-based API for working with storage in Chrome extensions.

Just drop in the `src/index.js` file into your project and you're good to go.

###Examples:
``` javascript
  ChromeStorage.set('name', 'akonwi').then(function() {
    // continue...
  })

  ChromeStorage.get('name').then(function(name) {
    console.log("my name is", name)
  })

  ChromeStorage.all().then(function(data) {
    console.log("my name is", data.name)
  })

  ChromeStorage.remove('name').then(function() {
    // continue..
  })
```

If for some reason you need to extend the ChromeStorage object, you'll have to use `Object.create(ChromeStorage)`
because ChromeStorage is immutable.
