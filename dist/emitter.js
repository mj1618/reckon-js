'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var actions = {
    ON: 'ON',
    BEFORE: 'BEFORE',
    AFTER: 'AFTER'
};

var Emitter = (function () {
    function Emitter() {
        _classCallCheck(this, Emitter);

        this._emitter = new _events2['default']();
        this._ons = {};
    }

    _createClass(Emitter, [{
        key: '_handle',
        value: function _handle(type, data, emitPath) {
            var _this = this;

            if (!this._ons[type]) {
                return false;
            }
            var current = this._ons[type].filter(function (on) {
                return (0, _filter2['default'])(on.filter, emitPath, on.listenPath);
            });
            var befores = current.filter(function (on) {
                return on.action === actions.BEFORE;
            });
            var ons = current.filter(function (on) {
                return on.action === actions.ON;
            });
            var afters = current.filter(function (on) {
                return on.action === actions.AFTER;
            });
            befores.concat(ons).concat(afters).map(function (on) {
                var ret = on.fn(data, _this._get(emitPath), emitPath);
                if (ret !== undefined) {
                    _this._set(ret, on.listenPath);
                }
                if (on.n > 0) {
                    on.n -= 1;
                }
                return on;
            });
            this._ons[type] = this._ons[type].filter(function (on) {
                return on.n !== 0;
            });
            return true;
        }
    }, {
        key: 'on',
        value: function on(type, fn, listenPath) {
            var filter = arguments.length <= 3 || arguments[3] === undefined ? _filter.filterTypes.EXACT : arguments[3];

            var _this2 = this;

            var n = arguments.length <= 4 || arguments[4] === undefined ? -1 : arguments[4];
            var action = arguments.length <= 5 || arguments[5] === undefined ? actions.ON : arguments[5];

            if (this._has(type, fn, listenPath, filter)) {
                return this.getRemover(type, fn, listenPath, filter);
            } else {
                if (!this._ons[type]) {
                    this._ons[type] = [];
                    this._emitter.on(type, function (data, emitPath) {
                        return _this2._handle(type, data, emitPath);
                    });
                }

                this._ons[type].push({
                    type: type,
                    fn: fn,
                    filter: filter,
                    n: n,
                    action: action,
                    listenPath: listenPath
                });
                return this.getRemover(type, fn, listenPath, filter);
            }
        }
    }, {
        key: 'getRemover',
        value: function getRemover(type, fn, listenPath) {
            var _this3 = this;

            var filter = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

            return function () {
                _this3._ons[type] = _this3._ons[type].filter(function (on) {
                    return on.fn !== fn || filter !== null && on.filter !== filter || listenPath !== null && on.listenPath !== listenPath;
                });
            };
        }
    }, {
        key: 'once',
        value: function once(type, fn, listenPath) {
            var filter = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

            return this.on(type, fn, listenPath, filter, 1);
        }
    }, {
        key: 'clear',
        value: function clear(type) {
            this._ons[type] = [];
        }
    }, {
        key: 'clearAll',
        value: function clearAll() {
            this._ons = {};
        }
    }, {
        key: '_has',
        value: function _has(type, fn, listenPath) {
            var filter = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

            return this._ons[type] && this._ons[type].some(function (a) {
                return a.fn === fn && (filter === null || a.filter === filter) && (listenPath === null || a.listenPath === listenPath);
            });
        }
    }, {
        key: 'off',
        value: function off(type, fn, listenPath) {
            var filter = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

            var remover = this.getRemover(type, fn, listenPath, filter);
            if (remover) {
                remover();
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'before',
        value: function before(type, fn, listenPath) {
            var filter = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
            var n = arguments.length <= 4 || arguments[4] === undefined ? -1 : arguments[4];

            return this.on(type, fn, listenPath, filter, n, actions.BEFORE);
        }
    }, {
        key: 'after',
        value: function after(type, fn, listenPath) {
            var filter = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
            var n = arguments.length <= 4 || arguments[4] === undefined ? -1 : arguments[4];

            return this.on(type, fn, listenPath, filter, n, actions.AFTER);
        }
    }, {
        key: 'emit',
        value: function emit(type, data, emitPath) {
            this._emitter.emit(type, data, emitPath);
        }
    }]);

    return Emitter;
})();

exports['default'] = Emitter;
module.exports = exports['default'];