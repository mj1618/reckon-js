'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helpers = require('./helpers');

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _filter = require('./filter');

var Select = (function () {
    function Select(reckon) {
        var _this = this;

        var path = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        _classCallCheck(this, Select);

        this._reckon = reckon;
        this._path = path;
        this._views = {};
        this._beforeUpdate = this.before('λupdate', function () {
            if (_this._reckon._updating) {
                throw new Error('State is already updating');
            }
            _this._reckon._updating = true;
        });
        this._afterUpdate = this.after('λupdate', function () {
            _this._reckon._updating = false;
        });
    }

    _createClass(Select, [{
        key: 'select',
        value: function select(selector) {
            return this._reckon.select(this._path.concat(_lodash2['default'].toPath(selector)));
        }
    }, {
        key: 'get',
        value: function get() {
            var path = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            return this._reckon._get(this._path.concat(_lodash2['default'].toPath(path)));
        }
    }, {
        key: 'getJS',
        value: function getJS() {
            var path = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            return this._reckon._getJS(this._path.concat(_lodash2['default'].toPath(path)));
        }
    }, {
        key: 'getRoot',
        value: function getRoot() {
            return this._reckon._get();
        }
    }, {
        key: 'getParent',
        value: function getParent() {
            if (this._path.length == 0) {
                return null;
            } else {
                return this._reckon._get(this._path.slice(0, this._path.length - 1));
            }
        }
    }, {
        key: 'addView',
        value: function addView(name, fn) {
            this._views[name] = new _view2['default'](name, fn, this);
            return this._views[name];
        }
    }, {
        key: 'getViews',
        value: function getViews() {
            return this._views;
        }
    }, {
        key: 'getView',
        value: function getView(name) {
            return this._views[name];
        }
    }, {
        key: 'emit',
        value: function emit(name) {
            var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            this._reckon.emit(name, data, this._path);
        }
    }, {
        key: 'on',
        value: function on(name, fn) {
            var filter = arguments.length <= 2 || arguments[2] === undefined ? _filter.filterTypes.CURRENT : arguments[2];

            return this._reckon.on(name, fn, this._path, filter);
        }
    }, {
        key: 'before',
        value: function before(name, fn) {
            var filter = arguments.length <= 2 || arguments[2] === undefined ? _filter.filterTypes.CURRENT : arguments[2];

            return this._reckon.before(name, fn, this._path, filter);
        }
    }, {
        key: 'after',
        value: function after(name, fn) {
            var filter = arguments.length <= 2 || arguments[2] === undefined ? _filter.filterTypes.CURRENT : arguments[2];

            return this._reckon.after(name, fn, this._path, filter);
        }
    }, {
        key: 'off',
        value: function off(name, fn) {
            var filter = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            return this._reckon.off(name, fn, this._path, filter);
        }
    }, {
        key: 'once',
        value: function once(name, fn) {
            var filter = arguments.length <= 2 || arguments[2] === undefined ? _filter.filterTypes.CURRENT : arguments[2];

            return this._reckon.once(name, fn, this._path, filter);
        }
    }, {
        key: 'clear',
        value: function clear(name) {
            return this._reckon.clear(name);
        }
    }, {
        key: 'clearAll',
        value: function clearAll() {
            return this._reckon.clearAll();
        }
    }, {
        key: 'update',
        value: function update(fn) {
            var _this2 = this;

            this.once('λupdate', function () {
                _this2._reckon._update(fn(_this2.get()), _this2._path);
            });
            this._reckon.emit('λupdate', null, this._path);
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(fn) {
            var _this3 = this;

            return this.on('λupdated', function (data) {
                if ((0, _helpers.isSubPath)(data.path, _this3._path) && !(0, _helpers.isRelativeEqual)({
                    path: data.path,
                    data: data.oldData
                }, {
                    path: _this3._path,
                    data: _this3.get()
                })) {
                    fn(_this3.get());
                }
            }, _filter.filterTypes.AFFECTED);
        }
    }]);

    return Select;
})();

exports['default'] = Select;
module.exports = exports['default'];