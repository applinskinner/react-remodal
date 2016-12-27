import React, { PropTypes } from 'react'
import Transition from 'react-addons-css-transition-group'
import PortalWrap from 'react-portal'

const TransitionPortal = ({ children, ...props }) => {
  return (
    <PortalWrap isOpened>
      <Wrapper>
        <Transition {...props}>
          {children}
        </Transition>
      </Wrapper>
    </PortalWrap>
  );
}

TransitionPortal.propTypes = {
  children: PropTypes.node
}

export default TransitionPortal

const Wrapper = props => { // refactor, need to correctly handle `props.closePortal`
  return (
    <div>
      {props.children}
    </div>
  );
}
