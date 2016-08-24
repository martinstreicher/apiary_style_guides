'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('es6-promise').polyfill();
require('isomorphic-fetch');

var Promise = require('es6-promise').Promise;
var query = require("refract-query").query;

var _class = function () {
  function _class(blueprintSpec, callback) {
    _classCallCheck(this, _class);

    this.blueprintSpec = blueprintSpec;
    this.callback = callback;
  }

  _createClass(_class, [{
    key: 'parse',
    value: function parse(content) {
      var request = new XMLHttpRequest();

      request.open('POST', 'https://api.apiblueprint.org/parser');
      request.setRequestHeader('Content-Type', 'text/vnd.apiblueprint');
      request.setRequestHeader('Accept', 'application/vnd.refract.parse-result+json');

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          var json = JSON.parse(this.responseText);
          var results = query(json, { element: 'httpResponse' });
          console.log(results);
        }
      };

      request.send(content);
    }
  }, {
    key: 'process',
    value: function process() {
      this.read(this.parse);
    }
  }, {
    key: 'read',
    value: function read(callback) {
      var reader = new XMLHttpRequest();

      reader.open("GET", this.blueprintSpec, false);

      reader.onreadystatechange = function () {
        if (reader.readyState === 4) {
          if (reader.status === 200 || reader.status == 0) {
            callback(reader.responseText);
          }
        }
      };

      reader.send(null);
    }
  }]);

  return _class;
}();

exports.default = _class;