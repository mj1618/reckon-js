'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.isSubPath = isSubPath;
exports.pathDiff = pathDiff;
exports.pathGet = pathGet;
exports.relativeData = relativeData;
exports.isRelativeEqual = isRelativeEqual;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function isSubPath(path, subPath) {
    if (!path || path.length == 0) {
        return true;
    } else {
        return _lodash2['default'].isEqual(subPath.slice(0, path.length), path);
    }
}

function pathDiff(from, to) {
    if (!isSubPath(from, to)) {
        throw new Error('pathDiff(from,to) must be given an initial path and a sub path: ' + to + ' is not a sub path of ' + from);
    }
    if (!to) {
        throw new Error('pathDiff(from,to) must be passed a "to" path, instead received: ' + to);
    }
    if (!from || from.length == 0) {
        return to;
    } else {
        return to.slice(from.length);
    }
}

function pathGet(data, path) {
    try {
        path.forEach(function (p) {
            data = data.get(p);
        });
        return data;
    } catch (e) {
        return null;
    }
}

function relativeData(data, from, to) {
    var diff = pathDiff(from, to);
    if (!diff || diff.length == 0) {
        return data;
    } else {
        return pathGet(data, diff);
    }
}

function isRelativeEqual(a, b) {

    if (!isSubPath(a.path, b.path)) {
        if (isSubPath(b.path, a.path)) {
            var _ref = [b, a];
            a = _ref[0];
            b = _ref[1];
        } else {
            return false;
        }
    }
    var aData = relativeData(a.data, a.path, b.path);
    return _immutable2['default'].is(aData, b.data);
}