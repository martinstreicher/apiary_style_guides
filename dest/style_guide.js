'use strict';

var _es6Promise = require('es6-promise');

var _http_getter = require('./http_getter');

var _http_getter2 = _interopRequireDefault(_http_getter);

var _apib_parser = require('./apib_parser');

var _apib_parser2 = _interopRequireDefault(_apib_parser);

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize
(0, _es6Promise.polyfill)();

var file = "https://raw.githubusercontent.com/martinstreicher/session_service/master/apiary.apib";
var getter = (0, _http_getter2.default)();
var parser = (0, _apib_parser2.default)();
var engine = (0, _engine2.default)();

var apib = getter.retrieve(file);
var parsed = parser.parse(apib);

engine.validate(parsed);