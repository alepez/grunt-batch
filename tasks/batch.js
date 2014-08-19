/*
 * grunt-batch
 * https://github.com/alessandro-pezzato/grunt-batch
 *
 * Copyright (c) 2014 Alessandro Pezzato
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;
var async = require('async');

module.exports = function (grunt) {
  grunt.registerMultiTask('batch', 'Easy way to run a shell command for each file.', function () {
    var options = this.options({
      setup: function (callback) {
        grunt.log.ok('setup...');
        callback();
      },
      cmd: function () {
        grunt.log.error('cmd is undefined');
      }
    });
    var setup = options.setup;
    var files = this.files;
    var done = this.async();
    setup(function () {
      grunt.log.ok('setup ok');
      var series = [];
      files.forEach(function (f) {
        var cmd = options.cmd(f);
        series.push(function (callback) {
          exec(cmd, function () {
            grunt.log.ok(f.src, ' => ', f.dest);
            callback();
          });
        });
      });
      async.series(series, done);
    });
  });
};