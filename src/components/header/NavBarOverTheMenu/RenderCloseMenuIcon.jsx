import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
    cursor: pointer
  `;
function RenderCloseMenuIcon(props) {
  const { handleMenuModalClose } = props;

  return (
    <ButtonWrapper
      className="d-flex justify-content-center align-items-center"
      onClick={
            () => {
              handleMenuModalClose();
            }
        }
    >
      <AiOutlineClose id="close-menu-icon" style={{ width: '30px', height: '30px' }} />
    </ButtonWrapper>
  );
}

RenderCloseMenuIcon.propTypes = {
  handleMenuModalClose: PropTypes.func,
};

RenderCloseMenuIcon.defaultProps = {
  handleMenuModalClose: () => {},
};

export default RenderCloseMenuIcon;
