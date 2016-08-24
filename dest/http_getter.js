"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isomorphicFetch = require("isomorphic-fetch");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HttpGetter = {
  retrieve: function retrieve(target) {
    return (0, _isomorphicFetch2.default)(target).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }

      return response.text();
    }).catch(function (error) {
      console.log("Error: #{error}");
    });
  }
};

var http_getter = function newHttpGetter() {
  return _extends({}, HttpGetter);
};

exports.default = http_getter;