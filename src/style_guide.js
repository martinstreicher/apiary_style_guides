import { polyfill } from 'es6-promise';
import http_getter from './http_getter';
import apib_parser from './apib_parser';

// Initialize
polyfill();

var file   = "https://raw.githubusercontent.com/martinstreicher/session_service/master/apiary.apib";
var getter = http_getter();
var parser = apib_parser();
var apib   = getter.retrieve(file); 
var parsed = parser.send(apib)

parsed
  .then(json => console.log(json));
