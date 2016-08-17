'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x8, _x9, _x10) { var _again = true; _function: while (_again) { var object = _x8, property = _x9, receiver = _x10; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x8 = parent; _x9 = property; _x10 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _select = require('./select');

var _select2 = _interopRequireDefault(_select);

var _helpers = require('./helpers');

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var Reckon = (function (_Emitter) {
    _inherits(Reckon, _Emitter);

    function Reckon() {
        var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Reckon);

        _get(Object.getPrototypeOf(Reckon.prototype), 'constructor', this).call(this);
        this._data = _immutable2['default'].fromJS(data);
        this._selects = {};
        this._updating = false;
        this._maxHistory = 0;
        if (options.maxHistory) {
            this._maxHistory = options.maxHistory;
        }
        this._history = [];
    }

    _createClass(Reckon, [{
        key: 'select',
        value: function select(selector) {
            var path = _lodash2['default'].toPath(selector);
            if (!this._selects[path]) {
                this._selects[path] = new _select2['default'](this, path);
            }
            return this._selects[path];
        }
    }, {
        key: '_get',
        value: function _get() {
            var path = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            if (path && path.length > 0) {
                return (0, _helpers.pathGet)(this._data, path);
            } else {
                return this._data;
            }
        }
    }, {
        key: '_getJS',
        value: function _getJS() {
            var path = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            var res = this._get(path);
            if (res instanceof Object) {
                return res.toJS();
            }
            return res;
        }
    }, {
        key: '_update',
        value: function _update(data) {
            var path = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
            var record = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

            var old = this._get(path);
            this._set(data, path);
            this.emit('λupdated', {
                path: path,
                oldData: old
            });

            if (record === true && this._history.length < this._maxHistory) {
                this._history.push({
                    path: path,
                    oldData: old
                });
            }
        }
    }, {
        key: '_set',
        value: function _set(data) {
            var path = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            if (path && path.length > 0) {
                this._data = this._get().merge(_lodash2['default'].set({}, path, data));
            } else {
                this._data = _immutable2['default'].fromJS(data);
            }
        }
    }, {
        key: 'undo',
        value: function undo() {
            if (this._history.length === 0) {
                return false;
            }
            var last = this._history.pop();
            this._set(last.oldData, last.path);
            return true;
        }
    }]);

    return Reckon;
})(_emitter2['default']);

exports['default'] = Reckon;
module.exports = exports['default'];