# grunt-batch

> Easy way to run a shell command for each file.

## Getting Started
This plugin requires Grunt `~0.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-batch --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-batch');
```

## The "batch" task

### Overview
In your project's Gruntfile, add a section named `batch` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  batch: {
    options: {
      cmd: function (f) {
        return 'cat ' + f.src.join(' ') + ' > ' + f.dest;
      },
      setup: function (done) {
        grunt.file.mkdir('tmp');
        done();
      }
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.cmd
Type: `function`
Default value: `undefined`

A function returning the command string to execute. It's executed for each file.

##### Example:

    cmd: function (f) {
      return 'cat ' + f.src.join(' ') + ' > ' + f.dest;
    },

Will join all files in `src` to `dest`, using the system command `cat`.

#### options.setup
Type: `function`
Default value:  `function (callback) { callback(); }`

A function that will be executed once at the startup.

### Usage Examples
_(Nothing yet)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
