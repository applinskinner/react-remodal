import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import blacklist from 'blacklist'
import { lock, unlock } from './helpers/scrollLock'
import TransitionPortal from './TransitionPortal'

const defaultClasses = {
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
}

const defaultTransitions = {
  dialogEnterTimeout: 300,
  dialogLeaveTimeout: 300,
  overlayEnterTimeout: 300,
  overlayLeaveTimeout: 300
}

export default function Remodal (
  options = {}
) {
  const classes = {
    ...defaultClasses,
    ...options.classes
  }

  const transitions = {
    ...defaultTransitions
  }

  return class Remodal extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      isOpen: PropTypes.bool,
      onClose: PropTypes.func,
      overlayClosesModal: PropTypes.bool,
      closeOnEscape: PropTypes.bool
    }

    static defaultProps = {
      isOpen: false,
      overlayClosesModal: true,
      closeOnEscape: true,
      onClose: function () {}
    }

    listenKeyboard = (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        this.props.onClose()
      }
    }

    componentDidMount () {
      if (this.props.closeOnEscape) {
        window.addEventListener('keydown', this.listenKeyboard, true)
      }
    }

    componentWillUnmount () {
      if (this.props.closeOnEscape) {
        window.removeEventListener('keydown', this.listenKeyboard, true)
      }
    }

    componentWillReceiveProps (nextProps) {
      if (!this.props.isOpen && nextProps.isOpen) {
        lock()
      } else if (this.props.isOpen && !nextProps.isOpen) {
        unlock()
      }
    }

    handleClose () {
      if (this.props.overlayClosesModal) {
        this.props.onClose()
      }
    }

    handleDialogClick (event) {
      event.stopPropagation()
    }

    get dialog () {
      const {
        isOpen,
        children
      } = this.props

      return (isOpen) ? (
        <div
          style={{
            // overlay has pointer, set to default
            // else dialog has pointer too.
            cursor: 'default'
          }}
          onClick={::this.handleDialogClick}
          className={classes.dialog}>
          {children}
        </div>
      ) : null
    }

    get overlay () {
      const {
        isOpen,
        overlayClosesModal
      } = this.props

      return (isOpen) ? (
        <div
          className={classes.overlay}
          style={{
            cursor: (overlayClosesModal) ? 'pointer' : 'default'
          }} onClick={::this.handleClose} />
      ) : null
    }

    render () {
      const props = blacklist(
        this.props,
        'overlayClosesModal',
        'isOpen',
        'onClose',
        'width',
        'closeOnEscape' // refactor, don't know how this is supposed to be used but it's causing errors
      )

      return (
        <div>
          <TransitionPortal {...props}
            classNames={{
              enter: classes.dialogEnter,
              enterActive: classes.dialogEnterActive,
              exit: classes.dialogLeave,
              exitActive: classes.dialogLeaveActive
            }}
            onClick={::this.handleClose}
            style={{
              cursor: (this.props.overlayClosesModal) ? 'pointer' : 'default'
            }}
            className={classNames({
              [classes.wrap]: true,
              [classes.wrapIsOpen]: this.props.isOpen
            })}
            timeout={{ enter: transitions.dialogEnterTimeout, exit: transitions.dialogLeaveTimeout }}
            component='div'>
            {this.dialog}
          </TransitionPortal>
          <TransitionPortal
            transitionName={{
              enter: classes.overlayEnter,
              enterActive: classes.overlayEnterActive,
              exit: classes.overlayLeave,
              exitActive: classes.overlayLeaveActive
            }}
            timeout={{ enter: transitions.overlayEnterTimeout, exit: transitions.overlayLeaveTimeout }}
            component='div'>
            {this.overlay}
          </TransitionPortal>
        </div>
      )
    }
  }
}
