var a = 5;
console.log('require');

(function(require){
    let require = 5;
    require('../lib/fakesPInternal');
})();

var _ = require('underscore'), $;
$ = require('jquery');
var Promise = require('../../js/release/bluebird.js');
require('../lib/fakesP');