'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lock = lock;
exports.unlock = unlock;

var _scrollbarWidth = require('scrollbar-width');

var _scrollbarWidth2 = _interopRequireDefault(_scrollbarWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navigator = navigator || { platform: 'unknown' };
var IS_IOS = /iPad|iPhone|iPod/.test(navigator.platform);

function lock() {
  if (IS_IOS) {
    return;
  }

  var paddingRight = (0, _scrollbarWidth2.default)(true);
  document.body.setAttribute('style', '\n    overflow: hidden;\n    -ms-touch-action: none;\n    touch-action: none;\n    padding-right: ' + paddingRight + 'px;\n  ');
}

function unlock() {
  if (IS_IOS) {
    return;
  }

  document.body.setAttribute('style', '');
}