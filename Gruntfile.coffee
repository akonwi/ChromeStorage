module.exports = (grunt) ->
  grunt.initConfig
    sass:
      dist:
        options:
          style: 'compressed'
          update: true
        files:
          'styles.css': 'styles.sass'
    watch:
      styles:
        files: 'styles.sass'
        tasks: 'sass'

  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', ['sass', 'watch']
