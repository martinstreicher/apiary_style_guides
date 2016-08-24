'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _refractQuery = require('refract-query');

var Engine = {
  validate: function validate(doc) {
    doc.then(function (elements) {
      var results = (0, _refractQuery.query)(elements, { element: 'httpResponse' });
      console.log(results);
    });
  }
};

var validator = function newEngine() {
  return _extends({}, Engine);
};

exports.default = validator;