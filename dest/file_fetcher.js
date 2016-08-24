"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var FileFetcher = {
  retrieve: function retrieve(target) {
    fetch(this.target).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      console.log(response);
      this._content = response.text();
    });
  }
};

var fetcher = function fileFetcherFactory() {
  return Object.assign(Object.create(FileFetcher), {});
};

exports.default = fetcher;