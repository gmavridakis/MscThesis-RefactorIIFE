const jscodeshift = require('../../../../node_modules/jscodeshift');



class JSCodeshiftWrapper {

    static parse(code) {
        const filter_by = { loc: false };
        return jscodeshift(code, filter_by);
    }
}

module.exports = Object.freeze({
    j: jscodeshift,
    parser: JSCodeshiftWrapper
});
