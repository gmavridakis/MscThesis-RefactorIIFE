const jscodeshift = require('../../../../node_modules/jscodeshift');

class JSCodeshiftWrapper {

    static parse(code) {
        return jscodeshift(code, { loc: true });
    }
}

module.exports = Object.freeze({
    j: jscodeshift,
    parser: JSCodeshiftWrapper
});
