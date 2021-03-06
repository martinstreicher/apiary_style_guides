function parseUriTemplate(data) {
  var uritemplate;
  !function(e){"use strict";function t(e){var n;if(null===e||void 0===e)return!1;if(r.isArray(e))return e.length>0;if("string"==typeof e||"number"==typeof e||"boolean"==typeof e)return!0;for(n in e)if(e.hasOwnProperty(n)&&t(e[n]))return!0;return!1}var n=function(){function e(e){this.options=e}return e.prototype.toString=function(){return JSON&&JSON.stringify?JSON.stringify(this.options):this.options},e}(),r=function(){function e(e){return"[object Array]"===Object.prototype.toString.apply(e)}function t(e){return"[object String]"===Object.prototype.toString.apply(e)}function n(e){return"[object Number]"===Object.prototype.toString.apply(e)}function r(e){return"[object Boolean]"===Object.prototype.toString.apply(e)}function i(e,t){var n,r="",i=!0;for(n=0;n<e.length;n+=1)i?i=!1:r+=t,r+=e[n];return r}function o(e,t){for(var n=[],r=0;r<e.length;r+=1)n.push(t(e[r]));return n}function s(e,t){for(var n=[],r=0;r<e.length;r+=1)t(e[r])&&n.push(e[r]);return n}function a(e){if("object"!=typeof e||null===e)return e;Object.freeze(e);var t,n;for(n in e)e.hasOwnProperty(n)&&(t=e[n],"object"==typeof t&&u(t));return e}function u(e){return"function"==typeof Object.freeze?a(e):e}return{isArray:e,isString:t,isNumber:n,isBoolean:r,join:i,map:o,filter:s,deepFreeze:u}}(),i=function(){function e(e){return e>="a"&&"z">=e||e>="A"&&"Z">=e}function t(e){return e>="0"&&"9">=e}function n(e){return t(e)||e>="a"&&"f">=e||e>="A"&&"F">=e}return{isAlpha:e,isDigit:t,isHexDigit:n}}(),o=function(){function e(e){var t,n,r="",i=s.encode(e);for(n=0;n<i.length;n+=1)t=i.charCodeAt(n),r+="%"+(16>t?"0":"")+t.toString(16).toUpperCase();return r}function t(e,t){return"%"===e.charAt(t)&&i.isHexDigit(e.charAt(t+1))&&i.isHexDigit(e.charAt(t+2))}function n(e,t){return parseInt(e.substr(t,2),16)}function r(e){if(!t(e,0))return!1;var r=n(e,1),i=s.numBytes(r);if(0===i)return!1;for(var o=1;i>o;o+=1)if(!t(e,3*o)||!s.isValidFollowingCharCode(n(e,3*o+1)))return!1;return!0}function o(e,r){var i=e.charAt(r);if(!t(e,r))return i;var o=n(e,r+1),a=s.numBytes(o);if(0===a)return i;for(var u=1;a>u;u+=1)if(!t(e,r+3*u)||!s.isValidFollowingCharCode(n(e,r+3*u+1)))return i;return e.substr(r,3*a)}var s={encode:function(e){return unescape(encodeURIComponent(e))},numBytes:function(e){return 127>=e?1:e>=194&&223>=e?2:e>=224&&239>=e?3:e>=240&&244>=e?4:0},isValidFollowingCharCode:function(e){return e>=128&&191>=e}};return{encodeCharacter:e,isPctEncoded:r,pctCharAt:o}}(),s=function(){function e(e){return i.isAlpha(e)||i.isDigit(e)||"_"===e||o.isPctEncoded(e)}function t(e){return i.isAlpha(e)||i.isDigit(e)||"-"===e||"."===e||"_"===e||"~"===e}function n(e){return":"===e||"/"===e||"?"===e||"#"===e||"["===e||"]"===e||"@"===e||"!"===e||"$"===e||"&"===e||"("===e||")"===e||"*"===e||"+"===e||","===e||";"===e||"="===e||"'"===e}return{isVarchar:e,isUnreserved:t,isReserved:n}}(),a=function(){function e(e,t){var n,r="",i="";for(("number"==typeof e||"boolean"==typeof e)&&(e=e.toString()),n=0;n<e.length;n+=i.length)i=e.charAt(n),r+=s.isUnreserved(i)||t&&s.isReserved(i)?i:o.encodeCharacter(i);return r}function t(t){return e(t,!0)}function n(e,t){var n=o.pctCharAt(e,t);return n.length>1?n:s.isReserved(n)||s.isUnreserved(n)?n:o.encodeCharacter(n)}function r(e){var t,n="",r="";for(t=0;t<e.length;t+=r.length)r=o.pctCharAt(e,t),n+=r.length>1?r:s.isReserved(r)||s.isUnreserved(r)?r:o.encodeCharacter(r);return n}return{encode:e,encodePassReserved:t,encodeLiteral:r,encodeLiteralCharacter:n}}(),u=function(){function e(e){t[e]={symbol:e,separator:"?"===e?"&":""===e||"+"===e||"#"===e?",":e,named:";"===e||"&"===e||"?"===e,ifEmpty:"&"===e||"?"===e?"=":"",first:"+"===e?"":e,encode:"+"===e||"#"===e?a.encodePassReserved:a.encode,toString:function(){return this.symbol}}}var t={};return e(""),e("+"),e("#"),e("."),e("/"),e(";"),e("?"),e("&"),{valueOf:function(e){return t[e]?t[e]:"=,!@|".indexOf(e)>=0?null:t[""]}}}(),f=function(){function e(e){this.literal=a.encodeLiteral(e)}return e.prototype.expand=function(){return this.literal},e.prototype.toString=e.prototype.expand,e}(),p=function(){function e(e){function t(){var t=e.substring(h,f);if(0===t.length)throw new n({expressionText:e,message:"a varname must be specified",position:f});c={varname:t,exploded:!1,maxLength:null},h=null}function r(){if(d===f)throw new n({expressionText:e,message:"after a ':' you have to specify the length",position:f});c.maxLength=parseInt(e.substring(d,f),10),d=null}var a,f,p=[],c=null,h=null,d=null,g="";for(a=function(t){var r=u.valueOf(t);if(null===r)throw new n({expressionText:e,message:"illegal use of reserved operator",position:f,operator:t});return r}(e.charAt(0)),f=a.symbol.length,h=f;f<e.length;f+=g.length){if(g=o.pctCharAt(e,f),null!==h){if("."===g){if(h===f)throw new n({expressionText:e,message:"a varname MUST NOT start with a dot",position:f});continue}if(s.isVarchar(g))continue;t()}if(null!==d){if(f===d&&"0"===g)throw new n({expressionText:e,message:"A :prefix must not start with digit 0",position:f});if(i.isDigit(g)){if(f-d>=4)throw new n({expressionText:e,message:"A :prefix must have max 4 digits",position:f});continue}r()}if(":"!==g)if("*"!==g){if(","!==g)throw new n({expressionText:e,message:"illegal character",character:g,position:f});p.push(c),c=null,h=f+1}else{if(null===c)throw new n({expressionText:e,message:"exploded without varspec",position:f});if(c.exploded)throw new n({expressionText:e,message:"exploded twice",position:f});if(c.maxLength)throw new n({expressionText:e,message:"an explode (*) MUST NOT follow to a prefix",position:f});c.exploded=!0}else{if(null!==c.maxLength)throw new n({expressionText:e,message:"only one :maxLength is allowed per varspec",position:f});if(c.exploded)throw new n({expressionText:e,message:"an exploeded varspec MUST NOT be varspeced",position:f});d=f+1}}return null!==h&&t(),null!==d&&r(),p.push(c),new l(e,a,p)}function t(t){var r,i,o=[],s=null,a=0;for(r=0;r<t.length;r+=1)if(i=t.charAt(r),null===a){if(null===s)throw new Error("reached unreachable code");if("{"===i)throw new n({templateText:t,message:"brace already opened",position:r});if("}"===i){if(s+1===r)throw new n({templateText:t,message:"empty braces",position:s});try{o.push(e(t.substring(s+1,r)))}catch(u){if(u.prototype===n.prototype)throw new n({templateText:t,message:u.options.message,position:s+u.options.position,details:u.options});throw u}s=null,a=r+1}}else{if("}"===i)throw new n({templateText:t,message:"unopened brace closed",position:r});"{"===i&&(r>a&&o.push(new f(t.substring(a,r))),a=null,s=r)}if(null!==s)throw new n({templateText:t,message:"unclosed brace",position:s});return a<t.length&&o.push(new f(t.substr(a))),new c(t,o)}return t}(),l=function(){function e(e){return JSON&&JSON.stringify?JSON.stringify(e):e}function n(e){if(!t(e))return!0;if(r.isString(e))return""===e;if(r.isNumber(e)||r.isBoolean(e))return!1;if(r.isArray(e))return 0===e.length;for(var n in e)if(e.hasOwnProperty(n))return!1;return!0}function i(e){var t,n=[];for(t in e)e.hasOwnProperty(t)&&n.push({name:t,value:e[t]});return n}function o(e,t,n){this.templateText=e,this.operator=t,this.varspecs=n}function s(e,t,n){var r="";if(n=n.toString(),t.named){if(r+=a.encodeLiteral(e.varname),""===n)return r+=t.ifEmpty;r+="="}return null!==e.maxLength&&(n=n.substr(0,e.maxLength)),r+=t.encode(n)}function u(e){return t(e.value)}function f(e,o,s){var f=[],p="";if(o.named){if(p+=a.encodeLiteral(e.varname),n(s))return p+=o.ifEmpty;p+="="}return r.isArray(s)?(f=s,f=r.filter(f,t),f=r.map(f,o.encode),p+=r.join(f,",")):(f=i(s),f=r.filter(f,u),f=r.map(f,function(e){return o.encode(e.name)+","+o.encode(e.value)}),p+=r.join(f,",")),p}function p(e,o,s){var f=r.isArray(s),p=[];return f?(p=s,p=r.filter(p,t),p=r.map(p,function(t){var r=a.encodeLiteral(e.varname);return r+=n(t)?o.ifEmpty:"="+o.encode(t)})):(p=i(s),p=r.filter(p,u),p=r.map(p,function(e){var t=a.encodeLiteral(e.name);return t+=n(e.value)?o.ifEmpty:"="+o.encode(e.value)})),r.join(p,o.separator)}function l(e,n){var o=[],s="";return r.isArray(n)?(o=n,o=r.filter(o,t),o=r.map(o,e.encode),s+=r.join(o,e.separator)):(o=i(n),o=r.filter(o,function(e){return t(e.value)}),o=r.map(o,function(t){return e.encode(t.name)+"="+e.encode(t.value)}),s+=r.join(o,e.separator)),s}return o.prototype.toString=function(){return this.templateText},o.prototype.expand=function(i){var o,a,u,c,h=[],d=!1,g=this.operator;for(o=0;o<this.varspecs.length;o+=1)if(a=this.varspecs[o],u=i[a.varname],null!==u&&void 0!==u)if(a.exploded&&(d=!0),c=r.isArray(u),"string"==typeof u||"number"==typeof u||"boolean"==typeof u)h.push(s(a,g,u));else{if(a.maxLength&&t(u))throw new Error("Prefix modifiers are not applicable to variables that have composite values. You tried to expand "+this+" with "+e(u));a.exploded?t(u)&&(g.named?h.push(p(a,g,u)):h.push(l(g,u))):(g.named||!n(u))&&h.push(f(a,g,u))}return 0===h.length?"":g.first+r.join(h,g.separator)},o}(),c=function(){function e(e,t){this.templateText=e,this.expressions=t,r.deepFreeze(this)}return e.prototype.toString=function(){return this.templateText},e.prototype.expand=function(e){var t,n="";for(t=0;t<this.expressions.length;t+=1)n+=this.expressions[t].expand(e);return n},e.parse=p,e.UriTemplateError=n,e}();e(c)}(function(e){"use strict";uritemplate=e});
  return uritemplate.parse(data);
}
;
var _getNestedObjectKeys, _hasCamelCase, _hasSpaces, _isCamelCase, _isDowncasedDashSeparated, _isKebabCase, _isNormalCase, _isPlural, _isSnakeCase, _isUUID, _isUtcIso8601DateTime, _parseCamelCase, _searchAmericanWord, _validStatusAndMethod, americanWords, preventAllCapsIdInJson, validateBodyBritishSpelling, validateDatetimeFormatInJsonAtKeys, validateExamplePresence, validateISODateFieldEndsWithDate, validateJsonCamelCaseKeys, validateOperationSummaryPresence, validatePluralisedResourceNamesInUri, validatePrettyPrintedJson, validateProperActionStatusCode, validateSchemaPresence, validateUUIDInJsonIdKeys, validateUriPartsDashSeparatedLowercase,
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

function _getNestedObjectKeys(obj) {
  var i, item, key, len, result, val;
  result = [];
  if (Array.isArray(obj)) {
    for (i = 0, len = obj.length; i < len; i++) {
      item = obj[i];
      result = result.concat(_getNestedObjectKeys(item));
    }
  } else {
    result = result.concat(Object.keys(obj));
    for (key in obj) {
      if (!hasProp.call(obj, key)) continue;
      val = obj[key];
      if (typeof val === 'object') {
        result = result.concat(_getNestedObjectKeys(val));
      }
    }
  }
  return result;
};

function _isDowncasedDashSeparated(string) {
  return (!string) || (_isKebabCase(string) && !string.match(/[A-Z]/g)) || _isNormalCase(string);
};

function _validStatusAndMethod(status, method) {
  var possibleMethods, statusCodeMap;
  statusCodeMap = {
    '200': ['GET', 'DELETE', 'PATCH'],
    '201': ['POST'],
    '202': ['POST', 'DELETE', 'PATCH'],
    '206': ['GET']
  };
  possibleMethods = statusCodeMap[status];
  if (possibleMethods === void 0) {
    return false;
  }
  if (indexOf.call(possibleMethods, method) >= 0) {
    return true;
  }
  return false;
};

function _parseCamelCase(string) {
  var rex, spaceDelimited;
  rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
  spaceDelimited = string.replace(rex, '$1$4 $2$3$5');
  return spaceDelimited.split(' ');
};

function _isUtcIso8601DateTime(string, utc) {
  var iso, match;
  iso = /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))?$/;
  match = string.match(iso);
  if (match === null) {
    return false;
  }
  if (utc) {
    if (match[3] === 'z' || match[3] === 'Z') {
      return true;
    }
    return false;
  } else {
    return true;
  }
};

function _isUUID(string) {
  return string.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g) !== null;
};

function _isCamelCase(string) {
  return _hasCamelCase(string) && !(string.match('_') || string.match('-') || _hasSpaces(string));
};

function _isKebabCase(string) {
  return !!string.match('-') && !(_hasCamelCase(string) || string.match('_') || _hasSpaces(string));
};

function _isNormalCase(string) {
  return !(_hasCamelCase(string) || !!string.match('-') || !!string.match('_') || _hasSpaces(string));
};

function _isSnakeCase(string) {
  return !!string.match('_') && !(_hasCamelCase(string) || string.match('-') || _hasSpaces(string));
};

function _hasCamelCase(string) {
  return !!string.match(/[A-Za-z0-9]([A-Z0-9]*[a-z][a-z0-9]*[A-Z]|[a-z0-9]*[A-Z][A-Z0-9]*[a-z])[A-Za-z0-9]*/);
};

function _hasSpaces(string) {
  return string.match(/\s+/) !== null;
};

function _isPlural(string) {
  return string.match(/s$/g) !== null;
};

function _searchAmericanWord(string) {
  var i, j, len, len1, ref, testWord, testWords, word, words;
  words = string.replace(/(\W)/g, ' ').replace(/\s+/, ' ').trim().split(/\s+/);
  testWords = americanWords();
  for (i = 0, len = words.length; i < len; i++) {
    word = words[i];
    if (ref = word.toLowerCase(), indexOf.call(testWords, ref) >= 0) {
      return word;
    } else if (_isCamelCase(word) || _isSnakeCase(word)) {
      for (j = 0, len1 = testWords.length; j < len1; j++) {
        testWord = testWords[j];
        if (word.toLowerCase().indexOf(testWord) > -1) {
          return word;
        }
      }
    }
  }
  return '';
};

function americanWords() {
  return ['accessorize', 'accessorized', 'accessorizes', 'accessorizing', 'acclimatization', 'acclimatize', 'acclimatized', 'acclimatizes', 'acclimatizing', 'accouterments', 'eon', 'eons', 'aerogram', 'aerograms', 'airplane', 'airplanes', 'esthete', 'esthetes', 'esthetic', 'esthetically', 'esthetics', 'etiology', 'aging', 'aggrandizement', 'agonize', 'agonized', 'agonizes', 'agonizing', 'agonizingly', 'almanac', 'almanacs', 'aluminum', 'amortizable', 'amortization', 'amortizations', 'amortize', 'amortized', 'amortizes', 'amortizing', 'amphitheater', 'amphitheaters', 'anemia', 'anemic', 'anesthesia', 'anesthetic', 'anesthetics', 'anesthetize', 'anesthetized', 'anesthetizes', 'anesthetizing', 'anesthetist', 'anesthetists', 'anesthetize', 'anesthetized', 'anesthetizes', 'anesthetizing', 'analog', 'analogs', 'analyze', 'analyzed', 'analyzes', 'analyzing', 'anglicize', 'anglicized', 'anglicizes', 'anglicizing', 'annualized', 'antagonize', 'antagonized', 'antagonizes', 'antagonizing', 'apologize', 'apologized', 'apologizes', 'apologizing', 'appall', 'appalls', 'appetizer', 'appetizers', 'appetizing', 'appetizingly', 'arbor', 'arbors', 'archeological', 'archeologically', 'archeologist', 'archeologists', 'archeology', 'ardor', 'armor', 'armored', 'armorer', 'armorers', 'armories', 'armory', 'artifact', 'artifacts', 'authorize', 'authorized', 'authorizes', 'authorizing', 'ax', 'backpedaled', 'backpedaling', 'banister', 'banisters', 'baptize', 'baptized', 'baptizes', 'baptizing', 'bastardize', 'bastardized', 'bastardizes', 'bastardizing', 'battleax', 'balk', 'balked', 'balking', 'balks', 'bedeviled', 'bedeviling', 'behavior', 'behavioral', 'behaviorism', 'behaviorist', 'behaviorists', 'behaviors', 'behoove', 'behooved', 'behooves', 'bejeweled', 'belabor', 'belabored', 'belaboring', 'belabors', 'beveled', 'bevies', 'bevy', 'biased', 'biasing', 'binging', 'bougainvillea', 'bougainvilleas', 'bowdlerize', 'bowdlerized', 'bowdlerizes', 'bowdlerizing', 'breathalyze', 'breathalyzed', 'breathalyzer', 'breathalyzers', 'breathalyzes', 'breathalyzing', 'brutalize', 'brutalized', 'brutalizes', 'brutalizing', 'busses', 'bussing', 'cesarean', 'cesareans', 'caliber', 'calibers', 'caliper', 'calipers', 'calisthenics', 'canalize', 'canalized', 'canalizes', 'canalizing', 'cancelation', 'cancelations', 'canceled', 'canceling', 'candor', 'cannibalize', 'cannibalized', 'cannibalizes', 'cannibalizing', 'canonize', 'canonized', 'canonizes', 'canonizing', 'capitalize', 'capitalized', 'capitalizes', 'capitalizing', 'caramelize', 'caramelized', 'caramelizes', 'caramelizing', 'carbonize', 'carbonized', 'carbonizes', 'carbonizing', 'caroled', 'caroling', 'catalog', 'cataloged', 'catalogs', 'cataloging', 'catalyze', 'catalyzed', 'catalyzes', 'catalyzing', 'categorize', 'categorized', 'categorizes', 'categorizing', 'cauterize', 'cauterized', 'cauterizes', 'cauterizing', 'caviled', 'caviling', 'centigram', 'centigrams', 'centiliter', 'centiliters', 'centimeter', 'centimeters', 'centralize', 'centralized', 'centralizes', 'centralizing', 'center', 'centered', 'centerfold', 'centerfolds', 'centerpiece', 'centerpieces', 'centers', 'channeled', 'channeling', 'characterize', 'characterized', 'characterizes', 'characterizing', 'check', 'checkbook', 'checkbooks', 'checkered', 'checks', 'chili', 'chimera', 'chimeras', 'chiseled', 'chiseling', 'circularize', 'circularized', 'circularizes', 'circularizing', 'civilize', 'civilized', 'civilizes', 'civilizing', 'clamor', 'clamored', 'clamoring', 'clamors', 'clangor', 'clarinetist', 'clarinetists', 'collectivize', 'collectivized', 'collectivizes', 'collectivizing', 'colonization', 'colonize', 'colonized', 'colonizer', 'colonizers', 'colonizes', 'colonizing', 'color', 'colorant', 'colorants', 'colored', 'coloreds', 'colorful', 'colorfully', 'coloring', 'colorize', 'colorized', 'colorizes', 'colorizing', 'colorless', 'colors', 'commercialize', 'commercialized', 'commercializes', 'commercializing', 'compartmentalize', 'compartmentalized', 'compartmentalizes', 'compartmentalizing', 'computerize', 'computerized', 'computerizes', 'computerizing', 'conceptualize', 'conceptualized', 'conceptualizes', 'conceptualizing', 'connection', 'connections', 'contextualize', 'contextualized', 'contextualizes', 'contextualizing', 'cozier', 'cozies', 'coziest', 'cozily', 'coziness', 'cozy', 'councilor', 'councilors', 'counseled', 'counseling', 'counselor', 'counselors', 'crenelated', 'criminalize', 'criminalized', 'criminalizes', 'criminalizing', 'criticize', 'criticized', 'criticizes', 'criticizing', 'crueler', 'cruelest', 'crystallization', 'crystallize', 'crystallized', 'crystallizes', 'crystallizing', 'cudgeled', 'cudgeling', 'customize', 'customized', 'customizes', 'customizing', 'cipher', 'ciphers', 'decentralization', 'decentralize', 'decentralized', 'decentralizes', 'decentralizing', 'decriminalization', 'decriminalize', 'decriminalized', 'decriminalizes', 'decriminalizing', 'defense', 'defenseless', 'defenses', 'dehumanization', 'dehumanize', 'dehumanized', 'dehumanizes', 'dehumanizing', 'demeanor', 'demilitarization', 'demilitarize', 'demilitarized', 'demilitarizes', 'demilitarizing', 'demobilization', 'demobilize', 'demobilized', 'demobilizes', 'demobilizing', 'democratization', 'democratize', 'democratized', 'democratizes', 'democratizing', 'demonize', 'demonized', 'demonizes', 'demonizing', 'demoralization', 'demoralize', 'demoralized', 'demoralizes', 'demoralizing', 'denationalization', 'denationalize', 'denationalized', 'denationalizes', 'denationalizing', 'deodorize', 'deodorized', 'deodorizes', 'deodorizing', 'depersonalize', 'depersonalized', 'depersonalizes', 'depersonalizing', 'deputize', 'deputized', 'deputizes', 'deputizing', 'desensitization', 'desensitize', 'desensitized', 'desensitizes', 'desensitizing', 'destabilization', 'destabilize', 'destabilized', 'destabilizes', 'destabilizing', 'dialed', 'dialing', 'dialog', 'dialogs', 'diarrhea', 'digitize', 'digitized', 'digitizes', 'digitizing', 'disk', 'discolor', 'discolored', 'discoloring', 'discolors', 'disks', 'disemboweled', 'disemboweling', 'disfavor', 'disheveled', 'dishonor', 'dishonorable', 'dishonorably', 'dishonored', 'dishonoring', 'dishonors', 'disorganization', 'disorganized', 'distill', 'distills', 'dramatization', 'dramatizations', 'dramatize', 'dramatized', 'dramatizes', 'dramatizing', 'draft', 'draftboard', 'draftboards', 'draftier', 'draftiest', 'drafts', 'draftsman', 'draftsmanship', 'draftsmen', 'draftswoman', 'draftswomen', 'drafty', 'driveled', 'driveling', 'dueled', 'dueling', 'economize', 'economized', 'economizes', 'economizing', 'edema', 'editorialize', 'editorialized', 'editorializes', 'editorializing', 'empathize', 'empathized', 'empathizes', 'empathizing', 'emphasize', 'emphasized', 'emphasizes', 'emphasizing', 'enameled', 'enameling', 'enamored', 'encyclopedia', 'encyclopedias', 'encyclopedic', 'endeavor', 'endeavored', 'endeavoring', 'endeavors', 'energize', 'energized', 'energizes', 'energizing', 'enroll', 'enrolls', 'enthrall', 'enthralls', 'epaulet', 'epaulets', 'epicenter', 'epicenters', 'epilog', 'epilogs', 'epitomize', 'epitomized', 'epitomizes', 'epitomizing', 'equalization', 'equalize', 'equalized', 'equalizer', 'equalizers', 'equalizes', 'equalizing', 'eulogize', 'eulogized', 'eulogizes', 'eulogizing', 'evangelize', 'evangelized', 'evangelizes', 'evangelizing', 'exorcize', 'exorcized', 'exorcizes', 'exorcizing', 'extemporization', 'extemporize', 'extemporized', 'extemporizes', 'extemporizing', 'externalization', 'externalizations', 'externalize', 'externalized', 'externalizes', 'externalizing', 'factorize', 'factorized', 'factorizes', 'factorizing', 'fecal', 'feces', 'familiarization', 'familiarize', 'familiarized', 'familiarizes', 'familiarizing', 'fantasize', 'fantasized', 'fantasizes', 'fantasizing', 'favor', 'favorable', 'favorably', 'favored', 'favoring', 'favorite', 'favorites', 'favoritism', 'favors', 'feminize', 'feminized', 'feminizes', 'feminizing', 'fertilization', 'fertilize', 'fertilized', 'fertilizer', 'fertilizers', 'fertilizes', 'fertilizing', 'fervor', 'fiber', 'fiberglass', 'fibers', 'fictionalization', 'fictionalizations', 'fictionalize', 'fictionalized', 'fictionalizes', 'fictionalizing', 'filet', 'fileted', 'fileting', 'filets', 'finalization', 'finalize', 'finalized', 'finalizes', 'finalizing', 'flutist', 'flutists', 'flavor', 'flavored', 'flavoring', 'flavorings', 'flavorless', 'flavors', 'flavorsome', 'fetal', 'fetid', 'fetus', 'fetuses', 'formalization', 'formalize', 'formalized', 'formalizes', 'formalizing', 'fossilization', 'fossilize', 'fossilized', 'fossilizes', 'fossilizing', 'fraternization', 'fraternize', 'fraternized', 'fraternizes', 'fraternizing', 'fulfill', 'fulfillment', 'fulfills', 'funneled', 'funneling', 'galvanize', 'galvanized', 'galvanizes', 'galvanizing', 'gamboled', 'gamboling', 'jail', 'jailbird', 'jailbirds', 'jailbreak', 'jailbreaks', 'jailed', 'jailer', 'jailers', 'jailing', 'jails', 'gasses', 'gage', 'gaged', 'gages', 'gaging', 'generalization', 'generalizations', 'generalize', 'generalized', 'generalizes', 'generalizing', 'ghettoize', 'ghettoized', 'ghettoizes', 'ghettoizing', 'gypsies', 'glamorize', 'glamorized', 'glamorizes', 'glamorizing', 'glamor', 'globalization', 'globalize', 'globalized', 'globalizes', 'globalizing', 'gluing', 'goiter', 'goiters', 'gonorrhea', 'gram', 'grams', 'graveled', 'gray', 'grayed', 'graying', 'grayish', 'grayness', 'grays', 'groveled', 'groveling', 'groin', 'groins', 'grueling', 'gruelingly', 'griffin', 'griffins', 'gynecological', 'gynecologist', 'gynecologists', 'gynecology', 'hematological', 'hematologist', 'hematologists', 'hematology', 'hemoglobin', 'hemophilia', 'hemophiliac', 'hemophiliacs', 'hemorrhage', 'hemorrhaged', 'hemorrhages', 'hemorrhaging', 'hemorrhoids', 'harbor', 'harbored', 'harboring', 'harbors', 'harmonization', 'harmonize', 'harmonized', 'harmonizes', 'harmonizing', 'homeopath', 'homeopathic', 'homeopaths', 'homeopathy', 'homogenize', 'homogenized', 'homogenizes', 'homogenizing', 'honor', 'honorable', 'honorably', 'honored', 'honoring', 'honors', 'hospitalization', 'hospitalize', 'hospitalized', 'hospitalizes', 'hospitalizing', 'humanize', 'humanized', 'humanizes', 'humanizing', 'humor', 'humored', 'humoring', 'humorless', 'humors', 'hybridize', 'hybridized', 'hybridizes', 'hybridizing', 'hypnotize', 'hypnotized', 'hypnotizes', 'hypnotizing', 'hypothesize', 'hypothesized', 'hypothesizes', 'hypothesizing', 'idealization', 'idealize', 'idealized', 'idealizes', 'idealizing', 'idolize', 'idolized', 'idolizes', 'idolizing', 'immobilization', 'immobilize', 'immobilized', 'immobilizer', 'immobilizers', 'immobilizes', 'immobilizing', 'immortalize', 'immortalized', 'immortalizes', 'immortalizing', 'immunization', 'immunize', 'immunized', 'immunizes', 'immunizing', 'impaneled', 'impaneling', 'imperiled', 'imperiling', 'individualize', 'individualized', 'individualizes', 'individualizing', 'industrialize', 'industrialized', 'industrializes', 'industrializing', 'inflection', 'inflections', 'initialize', 'initialized', 'initializes', 'initializing', 'initialed', 'initialing', 'install', 'installment', 'installments', 'installs', 'instill', 'instills', 'institutionalization', 'institutionalize', 'institutionalized', 'institutionalizes', 'institutionalizing', 'intellectualize', 'intellectualized', 'intellectualizes', 'intellectualizing', 'internalization', 'internalize', 'internalized', 'internalizes', 'internalizing', 'internationalization', 'internationalize', 'internationalized', 'internationalizes', 'internationalizing', 'ionization', 'ionize', 'ionized', 'ionizer', 'ionizers', 'ionizes', 'ionizing', 'italicize', 'italicized', 'italicizes', 'italicizing', 'itemize', 'itemized', 'itemizes', 'itemizing', 'jeopardize', 'jeopardized', 'jeopardizes', 'jeopardizing', 'jeweled', 'jeweler', 'jewelers', 'jewelry', 'judgment', 'kilogram', 'kilograms', 'kilometer', 'kilometers', 'labeled', 'labeling', 'labor', 'labored', 'laborer', 'laborers', 'laboring', 'labors', 'lackluster', 'legalization', 'legalize', 'legalized', 'legalizes', 'legalizing', 'legitimize', 'legitimized', 'legitimizes', 'legitimizing', 'leukemia', 'leveled', 'leveler', 'levelers', 'leveling', 'libeled', 'libeling', 'libelous', 'liberalization', 'liberalize', 'liberalized', 'liberalizes', 'liberalizing', 'license', 'licensed', 'licenses', 'licensing', 'likable', 'lionization', 'lionize', 'lionized', 'lionizes', 'lionizing', 'liquidize', 'liquidized', 'liquidizer', 'liquidizers', 'liquidizes', 'liquidizing', 'liter', 'liters', 'localize', 'localized', 'localizes', 'localizing', 'louver', 'louvered', 'louvers', 'luster', 'magnetize', 'magnetized', 'magnetizes', 'magnetizing', 'maneuverability', 'maneuverable', 'maneuver', 'maneuvered', 'maneuvers', 'maneuvering', 'maneuverings', 'marginalization', 'marginalize', 'marginalized', 'marginalizes', 'marginalizing', 'marshaled', 'marshaling', 'marveled', 'marveling', 'marvelous', 'marvelously', 'materialization', 'materialize', 'materialized', 'materializes', 'materializing', 'maximization', 'maximize', 'maximized', 'maximizes', 'maximizing', 'meager', 'mechanization', 'mechanize', 'mechanized', 'mechanizes', 'mechanizing', 'medieval', 'memorialize', 'memorialized', 'memorializes', 'memorializing', 'memorize', 'memorized', 'memorizes', 'memorizing', 'mesmerize', 'mesmerized', 'mesmerizes', 'mesmerizing', 'metabolize', 'metabolized', 'metabolizes', 'metabolizing', 'meter', 'meters', 'micrometer', 'micrometers', 'militarize', 'militarized', 'militarizes', 'militarizing', 'milligram', 'milligrams', 'milliliter', 'milliliters', 'millimeter', 'millimeters', 'miniaturization', 'miniaturize', 'miniaturized', 'miniaturizes', 'miniaturizing', 'minibusses', 'minimize', 'minimized', 'minimizes', 'minimizing', 'misbehavior', 'misdemeanor', 'misdemeanors', 'misspelled', 'miter', 'miters', 'mobilization', 'mobilize', 'mobilized', 'mobilizes', 'mobilizing', 'modeled', 'modeler', 'modelers', 'modeling', 'modernize', 'modernized', 'modernizes', 'modernizing', 'moisturize', 'moisturized', 'moisturizer', 'moisturizers', 'moisturizes', 'moisturizing', 'monolog', 'monologs', 'monopolization', 'monopolize', 'monopolized', 'monopolizes', 'monopolizing', 'moralize', 'moralized', 'moralizes', 'moralizing', 'motorized', 'mold', 'molded', 'molder', 'moldered', 'moldering', 'molders', 'moldier', 'moldiest', 'molding', 'moldings', 'molds', 'moldy', 'molt', 'molted', 'molting', 'molts', 'mustache', 'mustached', 'mustaches', 'mustachioed', 'multicolored', 'nationalization', 'nationalizations', 'nationalize', 'nationalized', 'nationalizes', 'nationalizing', 'naturalization', 'naturalize', 'naturalized', 'naturalizes', 'naturalizing', 'neighbor', 'neighborhood', 'neighborhoods', 'neighboring', 'neighborliness', 'neighborly', 'neighbors', 'neutralization', 'neutralize', 'neutralized', 'neutralizes', 'neutralizing', 'normalization', 'normalize', 'normalized', 'normalizes', 'normalizing', 'odor', 'odorless', 'odors', 'esophagus', 'esophaguses', 'estrogen', 'offense', 'offenses', 'omelet', 'omelets', 'optimize', 'optimized', 'optimizes', 'optimizing', 'organization', 'organizational', 'organizations', 'organize', 'organized', 'organizer', 'organizers', 'organizes', 'organizing', 'orthopedic', 'orthopedics', 'ostracize', 'ostracized', 'ostracizes', 'ostracizing', 'outmaneuver', 'outmaneuvered', 'outmaneuvers', 'outmaneuvering', 'overemphasize', 'overemphasized', 'overemphasizes', 'overemphasizing', 'oxidization', 'oxidize', 'oxidized', 'oxidizes', 'oxidizing', 'pederast', 'pederasts', 'pediatric', 'pediatrician', 'pediatricians', 'pediatrics', 'pedophile', 'pedophiles', 'pedophilia', 'paleolithic', 'paleontologist', 'paleontologists', 'paleontology', 'paneled', 'paneling', 'panelist', 'panelists', 'paralyze', 'paralyzed', 'paralyzes', 'paralyzing', 'parceled', 'parceling', 'parlor', 'parlors', 'particularize', 'particularized', 'particularizes', 'particularizing', 'passivization', 'passivize', 'passivized', 'passivizes', 'passivizing', 'pasteurization', 'pasteurize', 'pasteurized', 'pasteurizes', 'pasteurizing', 'patronize', 'patronized', 'patronizes', 'patronizing', 'patronizingly', 'pedaled', 'pedaling', 'pedestrianization', 'pedestrianize', 'pedestrianized', 'pedestrianizes', 'pedestrianizing', 'penalize', 'penalized', 'penalizes', 'penalizing', 'penciled', 'penciling', 'personalize', 'personalized', 'personalizes', 'personalizing', 'pharmacopeia', 'pharmacopeias', 'philosophize', 'philosophized', 'philosophizes', 'philosophizing', 'filter', 'filters', 'phony', 'plagiarize', 'plagiarized', 'plagiarizes', 'plagiarizing', 'plow', 'plowed', 'plowing', 'plowman', 'plowmen', 'plows', 'plowshare', 'plowshares', 'polarization', 'polarize', 'polarized', 'polarizes', 'polarizing', 'politicization', 'politicize', 'politicized', 'politicizes', 'politicizing', 'popularization', 'popularize', 'popularized', 'popularizes', 'popularizing', 'pouf', 'poufs', 'practice', 'practiced', 'practices', 'practicing', 'presidium', 'presidiums', 'pressurization', 'pressurize', 'pressurized', 'pressurizes', 'pressurizing', 'pretense', 'pretenses', 'primeval', 'prioritization', 'prioritize', 'prioritized', 'prioritizes', 'prioritizing', 'privatization', 'privatizations', 'privatize', 'privatized', 'privatizes', 'privatizing', 'professionalization', 'professionalize', 'professionalized', 'professionalizes', 'professionalizing', 'program', 'programs', 'prolog', 'prologs', 'propagandize', 'propagandized', 'propagandizes', 'propagandizing', 'proselytize', 'proselytized', 'proselytizer', 'proselytizers', 'proselytizes', 'proselytizing', 'psychoanalyze', 'psychoanalyzed', 'psychoanalyzes', 'psychoanalyzing', 'publicize', 'publicized', 'publicizes', 'publicizing', 'pulverization', 'pulverize', 'pulverized', 'pulverizes', 'pulverizing', 'pummel', 'pummeled', 'pajama', 'pajamas', 'pizzazz', 'quarreled', 'quarreling', 'radicalize', 'radicalized', 'radicalizes', 'radicalizing', 'rancor', 'randomize', 'randomized', 'randomizes', 'randomizing', 'rationalization', 'rationalizations', 'rationalize', 'rationalized', 'rationalizes', 'rationalizing', 'raveled', 'raveling', 'realizable', 'realization', 'realizations', 'realize', 'realized', 'realizes', 'realizing', 'recognizable', 'recognizably', 'recognizance', 'recognize', 'recognized', 'recognizes', 'recognizing', 'reconnoiter', 'reconnoitered', 'reconnoiters', 'reconnoitering', 'refueled', 'refueling', 'regularization', 'regularize', 'regularized', 'regularizes', 'regularizing', 'remodeled', 'remodeling', 'remold', 'remolded', 'remolding', 'remolds', 'reorganization', 'reorganizations', 'reorganize', 'reorganized', 'reorganizes', 'reorganizing', 'reveled', 'reveler', 'revelers', 'reveling', 'revitalize', 'revitalized', 'revitalizes', 'revitalizing', 'revolutionize', 'revolutionized', 'revolutionizes', 'revolutionizing', 'rhapsodize', 'rhapsodized', 'rhapsodizes', 'rhapsodizing', 'rigor', 'rigors', 'ritualized', 'rivaled', 'rivaling', 'romanticize', 'romanticized', 'romanticizes', 'romanticizing', 'rumor', 'rumored', 'rumors', 'saber', 'sabers', 'saltpeter', 'sanitize', 'sanitized', 'sanitizes', 'sanitizing', 'satirize', 'satirized', 'satirizes', 'satirizing', 'savior', 'saviors', 'savor', 'savored', 'savories', 'savoring', 'savors', 'savory', 'scandalize', 'scandalized', 'scandalizes', 'scandalizing', 'skeptic', 'skeptical', 'skeptically', 'skepticism', 'skeptics', 'scepter', 'scepters', 'scrutinize', 'scrutinized', 'scrutinizes', 'scrutinizing', 'secularization', 'secularize', 'secularized', 'secularizes', 'secularizing', 'sensationalize', 'sensationalized', 'sensationalizes', 'sensationalizing', 'sensitize', 'sensitized', 'sensitizes', 'sensitizing', 'sentimentalize', 'sentimentalized', 'sentimentalizes', 'sentimentalizing', 'sepulcher', 'sepulchers', 'serialization', 'serializations', 'serialize', 'serialized', 'serializes', 'serializing', 'sermonize', 'sermonized', 'sermonizes', 'sermonizing', 'sheik', 'shoveled', 'shoveling', 'shriveled', 'shriveling', 'signalize', 'signalized', 'signalizes', 'signalizing', 'signaled', 'signaling', 'smolder', 'smoldered', 'smoldering', 'smolders', 'sniveled', 'sniveling', 'snorkeled', 'snorkeling', 'snowplow', 'snowplow', 'socialization', 'socialize', 'socialized', 'socializes', 'socializing', 'sodomize', 'sodomized', 'sodomizes', 'sodomizing', 'solemnize', 'solemnized', 'solemnizes', 'solemnizing', 'somber', 'specialization', 'specializations', 'specialize', 'specialized', 'specializes', 'specializing', 'specter', 'specters', 'spiraled', 'spiraling', 'splendor', 'splendors', 'squirreled', 'squirreling', 'stabilization', 'stabilize', 'stabilized', 'stabilizer', 'stabilizers', 'stabilizes', 'stabilizing', 'standardization', 'standardize', 'standardized', 'standardizes', 'standardizing', 'stenciled', 'stenciling', 'sterilization', 'sterilizations', 'sterilize', 'sterilized', 'sterilizer', 'sterilizers', 'sterilizes', 'sterilizing', 'stigmatization', 'stigmatize', 'stigmatized', 'stigmatizes', 'stigmatizing', 'story', 'stories', 'subsidization', 'subsidize', 'subsidized', 'subsidizer', 'subsidizers', 'subsidizes', 'subsidizing', 'succor', 'succored', 'succoring', 'succors', 'sulfate', 'sulfates', 'sulfide', 'sulfides', 'sulfur', 'sulfurous', 'summarize', 'summarized', 'summarizes', 'summarizing', 'swiveled', 'swiveling', 'symbolize', 'symbolized', 'symbolizes', 'symbolizing', 'sympathize', 'sympathized', 'sympathizer', 'sympathizers', 'sympathizes', 'sympathizing', 'synchronization', 'synchronize', 'synchronized', 'synchronizes', 'synchronizing', 'synthesize', 'synthesized', 'synthesizer', 'synthesizers', 'synthesizes', 'synthesizing', 'siphon', 'siphoned', 'siphoning', 'siphons', 'systematization', 'systematize', 'systematized', 'systematizes', 'systematizing', 'tantalize', 'tantalized', 'tantalizes', 'tantalizing', 'tantalizingly', 'tasseled', 'technicolor', 'temporize', 'temporized', 'temporizes', 'temporizing', 'tenderize', 'tenderized', 'tenderizes', 'tenderizing', 'terrorize', 'terrorized', 'terrorizes', 'terrorizing', 'theater', 'theatergoer', 'theatergoers', 'theaters', 'theorize', 'theorized', 'theorizes', 'theorizing', 'ton', 'tons', 'toweled', 'toweling', 'toxemia', 'tranquilize', 'tranquilized', 'tranquilizer', 'tranquilizers', 'tranquilizes', 'tranquilizing', 'tranquility', 'tranquilize', 'tranquilized', 'tranquilizer', 'tranquilizers', 'tranquilizes', 'tranquilizing', 'tranquility', 'transistorized', 'traumatize', 'traumatized', 'traumatizes', 'traumatizing', 'traveled', 'traveler', 'travelers', 'traveling', 'travelog', 'travelogs', 'trialed', 'trialing', 'tricolor', 'tricolors', 'trivialize', 'trivialized', 'trivializes', 'trivializing', 'tumor', 'tumors', 'tunneled', 'tunneling', 'tyrannize', 'tyrannized', 'tyrannizes', 'tyrannizing', 'tire', 'tires', 'unauthorized', 'uncivilized', 'underutilized', 'unequaled', 'unfavorable', 'unfavorably', 'unionization', 'unionize', 'unionized', 'unionizes', 'unionizing', 'unorganized', 'unraveled', 'unraveling', 'unrecognizable', 'unrecognized', 'unrivaled', 'unsavory', 'untrammeled', 'urbanization', 'urbanize', 'urbanized', 'urbanizes', 'urbanizing', 'utilizable', 'utilization', 'utilize', 'utilized', 'utilizes', 'utilizing', 'valor', 'vandalize', 'vandalized', 'vandalizes', 'vandalizing', 'vaporization', 'vaporize', 'vaporized', 'vaporizes', 'vaporizing', 'vapor', 'vapors', 'verbalize', 'verbalized', 'verbalizes', 'verbalizing', 'victimization', 'victimize', 'victimized', 'victimizes', 'victimizing', 'videodisk', 'videodisks', 'vigor', 'visualization', 'visualizations', 'visualize', 'visualized', 'visualizes', 'visualizing', 'vocalization', 'vocalizations', 'vocalize', 'vocalized', 'vocalizes', 'vocalizing', 'vulcanized', 'vulgarization', 'vulgarize', 'vulgarized', 'vulgarizes', 'vulgarizing', 'wagon', 'wagons', 'watercolor', 'watercolors', 'weaseled', 'weaseling', 'westernization', 'westernize', 'westernized', 'westernizes', 'westernizing', 'womanize', 'womanized', 'womanizer', 'womanizers', 'womanizes', 'womanizing', 'woolen', 'woolens', 'woolies', 'wooly', 'worshiped', 'worshiping', 'worshiper', 'yodeled', 'yodeling', 'yogurt', 'yogurts', 'yogurt', 'yogurts'];
};


/*
Validates if property in JSON body containing string with ISO 8601 date is ending
with `date` or `Date`.

@targets: Request_Body, Response_Body
 */

function validateISODateFieldEndsWithDate(data) {
  var e, error, error1, findAndCheckDateField;
  if ((data == null) || data === "") {
    return true;
  }
  try {
    data = JSON.parse(data);
  } catch (error) {
    e = error;
    return true;
  }
  if (typeof data !== 'object') {
    return true;
  }
  function findAndCheckDateField(obj) {
    var key, results, value;
    results = [];
    for (key in obj) {
      value = obj[key];
      if (typeof value === 'object') {
        results.push(findAndCheckDateField(value));
      } else if (_isUtcIso8601DateTime(value, false)) {
        if (key.toLowerCase().match(/date$/g) === null) {
          throw new Error("Datetime key \"" + key + "\" does not end with 'date' or 'Date'");
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  try {
    findAndCheckDateField(data);
    return true;
  } catch (error1) {
    e = error1;
    return e.message;
  }
};


/*
Validates if JSON body string is a pretty printed JSON. It naively expects
at least one line per key in parsed object.

@targets: Request_Body, Response_Body
 */

function validatePrettyPrintedJson(json) {
  var countKeys, data, e, error, keyCount, linesCount;
  if ((json == null) || json === "") {
    return true;
  }
  try {
    data = JSON.parse(json);
  } catch (error) {
    e = error;
    return true;
  }
  if (typeof data !== 'object') {
    return true;
  }
  keyCount = 0;
  function countKeys(obj) {
    var key, results, value;
    results = [];
    for (key in obj) {
      value = obj[key];
      if (typeof value === 'object') {
        keyCount = keyCount + 1;
        results.push(countKeys(value));
      } else {
        results.push(keyCount = keyCount + 1);
      }
    }
    return results;
  };
  countKeys(data);
  linesCount = json.split("\n").length;
  if (linesCount >= keyCount) {
    return true;
  } else {
    return "JSON is not pretty-printed, expecting one key per line.";
  }
};


/*
Validates if there is no property containing all-caps `ID` string in JSON object bodies.

@targets: Request_Body, Response_Body
 */

function preventAllCapsIdInJson(data) {
  var checkKeysForId, e, error, error1;
  if ((data == null) || data === "") {
    return true;
  }
  try {
    data = JSON.parse(data);
  } catch (error) {
    e = error;
    return true;
  }
  if (typeof data !== 'object') {
    return true;
  }
  function checkKeysForId(obj) {
    var key, results, value;
    results = [];
    for (key in obj) {
      value = obj[key];
      if (typeof value === 'object') {
        results.push(checkKeysForId(value));
      } else {
        if (key.match(/ID$/g) !== null) {
          throw new Error("Key \"" + key + "\" contains all caps \"ID\".");
        } else {
          results.push(void 0);
        }
      }
    }
    return results;
  };
  try {
    checkKeysForId(data);
    return true;
  } catch (error1) {
    e = error1;
    return e.message;
  }
};


/*
Validates if there is no american spelling in JSON object bodies.

@targets: Request_Body, Response_Body
 */

function validateBodyBritishSpelling(data) {
  var result;
  data = JSON.stringify(data);
  result = _searchAmericanWord(data);
  if (result) {
    return 'Contains american spelling of word: ' + result;
  }
  return true;
};


/*
Validates proper combinations of request method and response status code.
Possible combinations are:
- 200: GET, DELETE, PATCH
- 201: POST
- 202: POST, DELETE, PATCH
- 206: GET

@targets: Action
 */

function validateProperActionStatusCode(action) {
  var httpExample, i, item, j, k, len, len1, len2, method, ref, ref1, ref2, ref3, ref4, ref5, request, response, responseCode, transaction, transactions;
  transactions = [];
  ref = (action != null ? action.content : void 0) || [];
  for (i = 0, len = ref.length; i < len; i++) {
    item = ref[i];
    if ((item != null ? item.element : void 0) === "httpTransaction") {
      transactions.push(item);
    }
  }
  if (transactions.length === 0) {
    return true;
  }
  for (j = 0, len1 = transactions.length; j < len1; j++) {
    transaction = transactions[j];
    request = null;
    response = null;
    ref1 = (transaction != null ? transaction.content : void 0) || [];
    for (k = 0, len2 = ref1.length; k < len2; k++) {
      httpExample = ref1[k];
      if ((httpExample != null ? httpExample.element : void 0) === "httpRequest") {
        request = httpExample;
      }
      if ((httpExample != null ? httpExample.element : void 0) === "httpResponse") {
        response = httpExample;
      }
    }
    method = request != null ? (ref2 = request.attributes) != null ? (ref3 = ref2.method) != null ? ref3.content : void 0 : void 0 : void 0;
    responseCode = response != null ? (ref4 = response.attributes) != null ? (ref5 = ref4.statusCode) != null ? ref5.content : void 0 : void 0 : void 0;
    if (_validStatusAndMethod(responseCode, method)) {
      return true;
    }
  }
  return 'No valid combination of status code and method not present.';
};


/*
Validates if last literal part of URI template is in plural form.

@targets: Resource_URI_Template
 */

function validatePluralisedResourceNamesInUri(data) {
  var expression, i, len, literalParts, parsed, part, ref;
  if (!data) {
    return false;
  }
  if (data === '/') {
    return true;
  }
  parsed = parseUriTemplate(data);
  literalParts = [];
  if (!parsed['expressions']) {
    return false;
  }
  ref = parsed['expressions'];
  for (i = 0, len = ref.length; i < len; i++) {
    expression = ref[i];
    if (expression['literal'] != null) {
      literalParts.push(expression['literal']);
    }
  }
  part = literalParts[literalParts.length - 1];
  part = part.replace(/\//g, '');
  if (!_isPlural(part)) {
    return "Last resource URI part \"" + part + "\" is not in plural form.";
  }
  return true;
};


/*
Validates if literal parts of the URI templates are dash separated and lowercased.
It expects no underscores and capital characters.

@targets: Resource_URI_Template
 */

function validateUriPartsDashSeparatedLowercase(data) {
  var expression, i, j, len, len1, literalParts, parsed, part, ref;
  if (!data) {
    return false;
  }
  parsed = parseUriTemplate(data);
  literalParts = [];
  if (!parsed['expressions']) {
    return false;
  }
  ref = parsed['expressions'];
  for (i = 0, len = ref.length; i < len; i++) {
    expression = ref[i];
    if (expression['literal'] != null) {
      literalParts.push(expression['literal']);
    }
  }
  for (j = 0, len1 = literalParts.length; j < len1; j++) {
    part = literalParts[j];
    if (!_isDowncasedDashSeparated(part)) {
      return "Uri part \"" + part + "\" is not lowercased or dash separated.";
    }
  }
  return true;
};


/*
Validates if JSON object keys are in camel-case format. It expects no
dashes or underscores in field names.

@targets: Request_Body, Response_Body
 */

function validateJsonCamelCaseKeys(data) {
  var checkFields, e, error, error1;
  if ((data == null) || data === "") {
    return true;
  }
  try {
    data = JSON.parse(data);
  } catch (error) {
    e = error;
    return 'JSON not parseable.';
  }
  if (typeof data !== 'object') {
    return true;
  }
  function checkFields(obj) {
    var key, results, value;
    results = [];
    for (key in obj) {
      value = obj[key];
      if (typeof value === 'object') {
        results.push(checkFields(value));
      } else {
        if (!(_isCamelCase(key) || _isNormalCase(key))) {
          throw new Error("Key \"" + key + "\" is not in camel case format.");
        } else {
          results.push(void 0);
        }
      }
    }
    return results;
  };
  try {
    checkFields(data);
    return true;
  } catch (error1) {
    e = error1;
    return e.message;
  }
};


/*
It validates that value under `id` key in body JSON object is in format of
UUID [1].

[1] http://en.wikipedia.org/wiki/Universally_unique_identifier

@targets: Request_Body, Response_Body
 */

function validateUUIDInJsonIdKeys(data) {
  var e, error, error1, findAndCheckIdField;
  if ((data == null) || data === "") {
    return true;
  }
  try {
    data = JSON.parse(data);
  } catch (error) {
    e = error;
    return 'JSON not parseable.';
  }
  if (typeof data !== 'object') {
    return true;
  }
  function findAndCheckIdField(obj) {
    var key, results, value;
    results = [];
    for (key in obj) {
      value = obj[key];
      if (typeof value === 'object') {
        results.push(findAndCheckIdField(value));
      } else if (key === 'id') {
        if (!_isUUID(String(value))) {
          throw new Error("Id key is not in UUID format.");
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  try {
    findAndCheckIdField(data);
    return true;
  } catch (error1) {
    e = error1;
    return e.message;
  }
};


/*
Validates if body JSON object values under datetime fields identified by key with trailing `At` are in format
of ISO 85601 [1] and in the UTC timezone.

[1]

@targets: Request_Body, Response_Body
 */

function validateDatetimeFormatInJsonAtKeys(data) {
  var e, error, error1, findAndCheckAtField;
  if ((data == null) || data === "") {
    return true;
  }
  try {
    data = JSON.parse(data);
  } catch (error) {
    e = error;
    return 'JSON not parseable.';
  }
  if (typeof data !== 'object') {
    return true;
  }
  function findAndCheckAtField(obj) {
    var key, results, value;
    results = [];
    for (key in obj) {
      value = obj[key];
      if (typeof value === 'object') {
        results.push(findAndCheckAtField(value));
      } else if (key.match(/At$/g) !== null) {
        if (!_isUtcIso8601DateTime(String(value), true)) {
          throw new Error("Datetime key \"" + key + "\" is not in format ISO8601 or in UTC.");
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
  try {
    findAndCheckAtField(data);
    return true;
  } catch (error1) {
    e = error1;
    return e.message;
  }
};


/*
Checks wether the current request/response has an example body

@targets: Response, Request
 */

function validateExamplePresence(httpReqRes) {
  var assetContents, found;
  found = false;
  assetContents = lodash.filter(httpReqRes.content, {
    element: 'asset'
  });
  if (assetContents.length > 0) {
    assetContents.forEach(function(assetContent) {
      if (lodash.has(assetContent, 'meta.classes') && lodash.where(assetContent.meta.classes, 'messageBody').length > 0) {
        return found = true;
      }
    });
  }
  if (found) {
    return found;
  }
  return 'Missing example for the current action';
};


/*
Checks wether the current resource has an operation summary

@targets: Resource
 */

function validateOperationSummaryPresence(resource) {
  if (!lodash.has(resource, 'meta.title')) {
    return 'The current resource is missing the operation summary';
  }
  return true;
};


/*
Checks wether the current transaction has a schema defined

@targets: Request, Response
 */

function validateSchemaPresence(actionExample) {
  var assetContent, assetContents, i, len;
  assetContents = lodash.filter(actionExample.content, {
    element: 'asset'
  });
  if (assetContents.length > 0) {
    for (i = 0, len = assetContents.length; i < len; i++) {
      assetContent = assetContents[i];
      if (lodash.has(assetContent, 'meta.classes') && lodash.where(assetContent.meta.classes, 'messageBodySchema').length > 0) {
        return true;
      }
    }
  }
  return 'Missing schema for the current action';
};

module.exports = {
  _getNestedObjectKeys: _getNestedObjectKeys,
  _searchAmericanWord: _searchAmericanWord,
  _isCamelCase: _isCamelCase,
  _isKebabCase: _isKebabCase,
  _isNormalCase: _isNormalCase,
  _isSnakeCase: _isSnakeCase,
  _isDowncasedDashSeparated: _isDowncasedDashSeparated,
  _isPlural: _isPlural,
  _isUUID: _isUUID,
  _isUtcIso8601DateTime: _isUtcIso8601DateTime,
  _parseCamelCase: _parseCamelCase,
  _validStatusAndMethod: _validStatusAndMethod,
  preventAllCapsIdInJson: preventAllCapsIdInJson,
  validateISODateFieldEndsWithDate: validateISODateFieldEndsWithDate,
  validateBodyBritishSpelling: validateBodyBritishSpelling,
  validateDatetimeFormatInJsonAtKeys: validateDatetimeFormatInJsonAtKeys,
  validateJsonCamelCaseKeys: validateJsonCamelCaseKeys,
  validatePluralisedResourceNamesInUri: validatePluralisedResourceNamesInUri,
  validatePrettyPrintedJson: validatePrettyPrintedJson,
  validateProperActionStatusCode: validateProperActionStatusCode,
  validateUUIDInJsonIdKeys: validateUUIDInJsonIdKeys,
  validateUriPartsDashSeparatedLowercase: validateUriPartsDashSeparatedLowercase,
  validateExamplePresence: validateExamplePresence,
  validateOperationSummaryPresence: validateOperationSummaryPresence,
  validateSchemaPresence: validateSchemaPresence
};

