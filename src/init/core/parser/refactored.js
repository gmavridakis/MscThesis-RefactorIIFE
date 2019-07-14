
export class Controller{
    constructor(param1, param2) {
      const name = "Grigoris";
      let age = 26;
      this.name = "Mavridakis";
    }

    contributeTo(param) {
      var foo = "mavr";
    }

    static staticMethod(param) {
      var bar = "webpack-cli";
    }

    get hello() {
      return "world";
    }

    set hello(name) {
      console.log("Do anything with " + name);
    }

    get lastname() {
      return "gregorio";
    }
  }

  let cont = new Controller()

  console.log('testing class ES6 : ')
  console.log(cont);
  console.log(cont.hello);
  console.log(cont.lastname);