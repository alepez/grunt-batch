/*
 * grunt-batch
 * https://github.com/alessandro-pezzato/grunt-batch
 *
 * Copyright (c) 2014 Alessandro Pezzato
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;
var path = require('path');
var async = require('async');

module.exports = function (grunt) {
  grunt.registerMultiTask('batch', 'Easy way to run a shell command for each file.', function () {
    var options = this.options({
      setup: function (cb) {
        cb();
      },
      cmd: function (cb) {
        grunt.log.error('cmd is undefined');
        cb();
      },
      limit: 1
    });
    var setup = options.setup;
    var files = this.files;
    var done = this.async();
    setup(function () {
      var tasks = [];
      files.forEach(function (f) {
        var cmd = options.cmd(f);
        tasks.push(function (cb) {
          grunt.file.mkdir(path.dirname(f.dest));
          exec(cmd, function (e) {
            if (e) {
              grunt.log.error(f.src, ' => ', f.dest, e.message);
            } else {
              grunt.log.ok(f.src, ' => ', f.dest);
            }
            cb();
          });
        });
      });
      async.parallelLimit(tasks, options.limit, done);
    });
  });
};