'use strict';

var _refractQuery = require('refract-query');

var engine = {
  validate: function validate(doc) {
    result = doc.then(function (elements) {
      return 5;
    });

    Promise.resolve(result, function (status) {
      return status;
    });
  }
};