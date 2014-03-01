'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var PercolatorGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the Percolator generator.'));

    var prompts = [
      {
        name: 'appName',
        message: 'Whats your app name?'
      },
      {
        name: 'description',
        message: 'Describe your app'
      },
      {
        name: 'version',
        message: 'Version number of the app'
      },
      {
        name: 'repo',
        message: 'Whats the Repo'
      },
      {
        name: 'developerName',
        message: 'Developer name'
      },
      {
        name: 'homepage',
        message: 'Project home page'
      },
      {
        name: 'developerHomepage',
        message: 'Developer homepage'
      },
    ];

    this.prompt(prompts, function (props) {
      var that = this;

      Object.keys(props).forEach(function (key) {
        that[key] = props[key];
      });

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('lib');
    this.template('_main.js', 'lib/main.js');
    this.mkdir('test');

    this.template('_Makefile', 'Makefile');
    this.template('_HISTORY.md', 'HISTORY.md');
    this.template('_README.md', 'README.md');
    this.template('_package.json', 'package.json');
    this.template('_component.json', 'component.json');
    this.copy('gitignore', '.gitignore');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = PercolatorGenerator;