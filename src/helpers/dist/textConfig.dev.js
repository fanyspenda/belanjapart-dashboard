"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regexStartEndSpace = exports.truncate = void 0;

var truncate = function truncate(string, max) {
  if (string) {
    if (string.length > max) return "".concat(string.substring(0, max), "...");
    return string;
  }
};

exports.truncate = truncate;
var regexStartEndSpace = /^\s+|\s+$/g;
exports.regexStartEndSpace = regexStartEndSpace;