require('es6-promise').polyfill();
require('isomorphic-fetch');

var Promise = require('es6-promise').Promise
var query   = require("refract-query").query;

export default class {
  constructor(blueprintSpec, callback) {
    this.blueprintSpec = blueprintSpec;
    this.callback      = callback;
  }

  parse(content) {
    let request = new XMLHttpRequest();

    request.open('POST', 'https://api.apiblueprint.org/parser');
    request.setRequestHeader('Content-Type', 'text/vnd.apiblueprint');
    request.setRequestHeader('Accept', 'application/vnd.refract.parse-result+json');

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        let json    = JSON.parse(this.responseText);
        let results = query(json, {element: 'httpResponse'});
        console.log(results);
      }
    };

    request.send(content);
  }

  process() {
    this.read(this.parse);
  }

  read(callback) {
    let reader = new XMLHttpRequest();

    reader.open("GET", this.blueprintSpec, false);

    reader.onreadystatechange = function () {
      if (reader.readyState === 4) {
        if (reader.status === 200 || reader.status == 0) {
          callback(reader.responseText);
        }
      }
    }

    reader.send(null);
  }
}
