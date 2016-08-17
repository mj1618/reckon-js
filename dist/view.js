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

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var View = (function () {
    function View(name, fn, selector) {
        var _this = this;

        _classCallCheck(this, View);

        this._name = name;
        this._fn = fn;
        this._selector = selector;
        this._selector.onUpdate(function () {
            return _this._selectUpdate();
        });
        this._selectUpdate();
    }

    _createClass(View, [{
        key: '_selectUpdate',
        value: function _selectUpdate() {
            var data = this._fn(this._selector.get());

            if (!_immutable2['default'].is(this._data, data)) {
                this._data = data;
                this._selector.emit(this._name + 'λupdated');
            }
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate(fn) {
            var _this2 = this;

            this._selector.on(this._name + 'λupdated', function () {
                return fn(_this2._data);
            });
        }
    }, {
        key: 'get',
        value: function get() {
            return this._data;
        }
    }, {
        key: 'getJS',
        value: function getJS() {
            if (this._data instanceof Object) {
                return this._data.toJS();
            } else {
                return this._data;
            }
        }
    }]);

    return View;
})();

exports['default'] = View;
module.exports = exports['default'];