function Controller(param1, param2) {
    const name = "a_name";
    let age = 25;
  }
  
  Controller.prototype.name = "a_name_@";
  
  Controller.prototype.contributeTo = function(param) {
    var foo = "webpack";
  };
  
  Controller.staticMethod = function(param) {
    var bar = "webpack-cli";
  };
  
  Object.defineProperty(Controller.prototype, "hello", {
    get: function() {
      return "world";
    },
    set: function(name) {
      console.log("Do anything with " + name);
    }
  });
  
  Object.defineProperty(Controller.prototype, "lastname", {
    get: function() {
      return "Mavridakis";
    }
  });

  (function Controller(param1, param2) {
    const name = "a_name";
    let age = 25;
  })()