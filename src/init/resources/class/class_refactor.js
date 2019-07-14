(function(){

  function Controller(param1, param2) {
    const name = "Grigoris";
    let age = 26;
  }
  
  Controller.prototype.name = "Mavridakis";
  
  Controller.prototype.contributeTo = function(param) {
    var foo = "mavr";
  }
  
  Controller.staticMethod = function(param) {
    var bar = "webpack-cli";
  }
  
  Object.defineProperty(Controller.prototype, "hello", {
    get: function() {
      return "world";
    },
    set: function(name) {
      console.log("Do anything with " + name);
    }
  })
  
  Object.defineProperty(Controller.prototype, "lastname", {
    get: function() {
      return "gregorio";
    }
  })

})();

(function(){
  console.log('testing');
})();