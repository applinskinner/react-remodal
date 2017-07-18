'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = Remodal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _scrollLock = require('./helpers/scrollLock');

var _TransitionPortal = require('./TransitionPortal');

var _TransitionPortal2 = _interopRequireDefault(_TransitionPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultClasses = {
  'dialog': 'react-remodal__dialog',
  'dialogEnter': 'react-remodal__dialog--enter',
  'dialogEnterActive': 'react-remodal__dialog--enter-active',
  'dialogExit': 'react-remodal__dialog--exit',
  'dialogExitActive': 'react-remodal__dialog--exit-active',
  'overlay': 'react-remodal__overlay',
  'overlayEnter': 'react-remodal__overlay--enter',
  'overlayEnterActive': 'react-remodal__overlay--enter-active',
  'overlayExit': 'react-remodal__overlay--exit',
  'overlayExitActive': 'react-remodal__overlay--exit-active',
  'wrap': 'react-remodal__wrap',
  'wrapIsOpen': 'react-remodal__wrap--is-open'
};

var defaultTransitions = {
  dialogEnterTimeout: 300,
  dialogExitTimeout: 300,
  overlayEnterTimeout: 300,
  overlayExitTimeout: 300
};

function Remodal() {
  var _class, _temp2;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var classes = (0, _extends3.default)({}, defaultClasses, options.classes);

  var transitions = (0, _extends3.default)({}, defaultTransitions);

  return _temp2 = _class = function (_Component) {
    (0, _inherits3.default)(Remodal, _Component);

    function Remodal() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3.default)(this, Remodal);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Remodal.__proto__ || (0, _getPrototypeOf2.default)(Remodal)).call.apply(_ref, [this].concat(args))), _this), _this.listenKeyboard = function (event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
          _this.props.onClose();
        }
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Remodal, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.closeOnEscape) {
          window.addEventListener('keydown', this.listenKeyboard, true);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.props.closeOnEscape) {
          window.removeEventListener('keydown', this.listenKeyboard, true);
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
          (0, _scrollLock.lock)();
        } else if (this.props.isOpen && !nextProps.isOpen) {
          (0, _scrollLock.unlock)();
        }
      }
    }, {
      key: 'handleClose',
      value: function handleClose() {
        if (this.props.overlayClosesModal) {
          this.props.onClose();
        }
      }
    }, {
      key: 'handleDialogClick',
      value: function handleDialogClick(event) {
        event.stopPropagation();
      }
    }, {
      key: 'render',
      value: function render() {
        var _classNames;

        var props = (0, _blacklist2.default)(this.props, 'overlayClosesModal', 'isOpen', 'onClose', 'width', 'closeOnEscape' // refactor, don't know how this is supposed to be used but it's causing errors
        );

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _TransitionPortal2.default,
            (0, _extends3.default)({}, props, {
              classNames: {
                enter: classes.dialogEnter,
                enterActive: classes.dialogEnterActive,
                exit: classes.dialogExit,
                exitActive: classes.dialogExitActive
              },
              onClick: this.handleClose.bind(this),
              style: {
                cursor: this.props.overlayClosesModal ? 'pointer' : 'default'
              },
              className: (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.wrap, true), (0, _defineProperty3.default)(_classNames, classes.wrapIsOpen, this.props.isOpen), _classNames)),
              timeout: { enter: transitions.dialogEnterTimeout, exit: transitions.dialogExitTimeout } }),
            this.dialog
          ),
          _react2.default.createElement(
            _TransitionPortal2.default,
            {
              classNames: {
                enter: classes.overlayEnter,
                enterActive: classes.overlayEnterActive,
                exit: classes.overlayExit,
                exitActive: classes.overlayExitActive
              },
              timeout: { enter: transitions.overlayEnterTimeout, exit: transitions.overlayExitTimeout } },
            this.overlay
          )
        );
      }
    }, {
      key: 'dialog',
      get: function get() {
        var _props = this.props,
            isOpen = _props.isOpen,
            children = _props.children;


        return isOpen ? _react2.default.createElement(
          'div',
          {
            style: {
              // overlay has pointer, set to default
              // else dialog has pointer too.
              cursor: 'default'
            },
            onClick: this.handleDialogClick.bind(this),
            className: classes.dialog },
          children
        ) : null;
      }
    }, {
      key: 'overlay',
      get: function get() {
        var _props2 = this.props,
            isOpen = _props2.isOpen,
            overlayClosesModal = _props2.overlayClosesModal;


        return isOpen ? _react2.default.createElement('div', {
          className: classes.overlay,
          style: {
            cursor: overlayClosesModal ? 'pointer' : 'default'
          }, onClick: this.handleClose.bind(this) }) : null;
      }
    }]);
    return Remodal;
  }(_react.Component), _class.propTypes = {
    children: _react.PropTypes.node.isRequired,
    isOpen: _react.PropTypes.bool,
    onClose: _react.PropTypes.func,
    overlayClosesModal: _react.PropTypes.bool,
    closeOnEscape: _react.PropTypes.bool
  }, _class.defaultProps = {
    isOpen: false,
    overlayClosesModal: true,
    closeOnEscape: true,
    onClose: function onClose() {}
  }, _temp2;
}
module.exports = exports['default'];