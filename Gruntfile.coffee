module.exports = (grunt) ->
  grunt.initConfig
    babel:
      options:
        sourceMap: true
      dist:
        files:
          'dist/chrome-storage.js': 'src/index.js'
    watch:
      es6:
        files: 'src/index.js'
        tasks: 'babel'

  grunt.loadNpmTasks 'grunt-babel'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', ['babel', 'watch']
