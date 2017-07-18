import React, { PropTypes } from 'react'
import { CSSTransition } from 'react-transition-group'
import PortalWrap from 'react-portal-minimal'

const TransitionPortal = ({ children, ...props }) => {
  let content = null;

  if (children) {
    content = (
      <CSSTransition {...props}>
        {children}
      </CSSTransition>
    );
  }

  return (
    <PortalWrap isOpened>
      <Wrapper>
        {content}
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
