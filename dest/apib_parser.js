'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApibSender = {
  send: function send(text_file_promise) {
    return text_file_promise.then(function (text) {
      return (0, _isomorphicFetch2.default)('https://api.apiblueprint.org/parser', {
        body: text,
        headers: {
          'Accept': 'application/vnd.refract.parse-result+json',
          'Content-Type': 'text/vnd.apiblueprint'
        },
        method: 'post'
      });
    }).then(function (response) {
      return response.json();
    }).catch(function (error) {
      console.log(error);
    });
  }
};

var apib_parser = function newApibSender() {
  return _extends({}, ApibSender);
};

exports.default = apib_parser;