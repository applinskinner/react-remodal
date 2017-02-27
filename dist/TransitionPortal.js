'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactPortal = require('react-portal');

var _reactPortal2 = _interopRequireDefault(_reactPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TransitionPortal = function TransitionPortal(_ref) {
  var children = _ref.children,
      props = (0, _objectWithoutProperties3.default)(_ref, ['children']);

  return _react2.default.createElement(
    _reactPortal2.default,
    { isOpened: true },
    _react2.default.createElement(
      Wrapper,
      null,
      _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        props,
        children
      )
    )
  );
};

TransitionPortal.propTypes = {
  children: _react.PropTypes.node
};

exports.default = TransitionPortal;


var Wrapper = function Wrapper(props) {
  // refactor, need to correctly handle `props.closePortal`
  return _react2.default.createElement(
    'div',
    null,
    props.children
  );
};
module.exports = exports['default'];