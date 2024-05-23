import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
    cursor: pointer
`;

function RenderCloseFilterModalIcon(props) {
  const { handleFilterModalClose } = props;

  return (
    <ButtonWrapper
      className="d-flex justify-content-center align-items-center"
      onClick={
                () => {
                  handleFilterModalClose();
                }
            }
    >
      <AiOutlineClose id="close-menu-icon" style={{ width: '30px', height: '30px' }} />
    </ButtonWrapper>
  );
}

RenderCloseFilterModalIcon.propTypes = {
  handleFilterModalClose: PropTypes.func,
};

RenderCloseFilterModalIcon.defaultProps = {
  handleFilterModalClose: () => {
  },
};

export default RenderCloseFilterModalIcon;
