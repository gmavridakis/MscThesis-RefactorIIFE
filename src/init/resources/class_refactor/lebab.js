(function(){
    'use strict';
    var _ = require('lodash');
    
    function Person(cfg) {
      this.names = [cfg.fname, cfg.lname];
    }
    Person.prototype.greet = function(title) {
      title = title || "Mr";
      var fullName = this.names
        .map(function(n) {
          n = n || ''
          return _.upperFirst(n);
        })
        .join(" ");
    
      console.log("Hello " + title + " " + fullName + "!");
    };
    Person.prototype.greetWithAllTitles = function() {
      for (var i = 0; i < arguments.length; i++) {
        var title = arguments[i];
        this.greet(title);
      }
    };
    module.exports = Person;
})()