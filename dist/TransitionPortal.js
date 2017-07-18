'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTransitionGroup = require('react-transition-group');

var _reactPortalMinimal = require('react-portal-minimal');

var _reactPortalMinimal2 = _interopRequireDefault(_reactPortalMinimal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TransitionPortal = function TransitionPortal(_ref) {
  var children = _ref.children,
      props = (0, _objectWithoutProperties3.default)(_ref, ['children']);

  var content = null;

  if (children) {
    content = _react2.default.createElement(
      _reactTransitionGroup.CSSTransition,
      props,
      children
    );
  }

  return _react2.default.createElement(
    _reactPortalMinimal2.default,
    { isOpened: true },
    _react2.default.createElement(
      Wrapper,
      null,
      content
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