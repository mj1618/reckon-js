'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = filterPath;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var filterTypes = ['SUB', 'SUPER', 'ANY', 'ROOT', 'CURRENT', 'SUB_EXCLUSIVE', 'SUPER_EXCLUSIVE', 'AFFECTED'].reduce(function (m, v) {
    m[v] = v;return m;
}, {});

exports.filterTypes = filterTypes;

function isSuper(a, b) {
    return a === null || b !== null && _lodash2['default'].isEqual(a, b.slice(0, a.length));
}
function isSub(a, b) {
    return b === null || a !== null && _lodash2['default'].isEqual(b, a.slice(0, b.length));
}

function isRoot(a, b) {
    return a === null || a.length === 0;
}

function isEqual(a, b) {
    return _lodash2['default'].isEqual(a, b);
}

function filterPath(f) {
    var a = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var b = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    switch (f) {
        case 'SUPER':
            return isSuper(a, b);
        case 'SUB':
            return isSub(a, b);
        case 'ANY':
            return true;
        case 'AFFECTED':
            return isSuper(a, b) || isSub(a, b);
        case 'ROOT':
            return isRoot(a, b);
        case 'CURRENT':
            return isEqual(a, b);
        case 'SUPER_EXCLUSIVE':
            return !isEqual(a, b) && isSuper(a, b);
        case 'SUB_EXCLUSIVE':
            return !isEqual(a, b) && isSub(a, b);
        default:
            return false;
    }
}