import React from 'react';
import { FaBars } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function RenderBurgerMenuIcon(props) {
  const { handleShowMenuModal } = props;

  const ButtonWrapper = styled.div`
    cursor: pointer
  `;

  return (
    <ButtonWrapper
      onClick={
          () => {
            handleShowMenuModal();
          }
        }
    >
      <FaBars
        id="burger-menu-icon"
        style={{
          width: '30px',
          height: '30px',
        }}
      />
    </ButtonWrapper>
  );
}

RenderBurgerMenuIcon.propTypes = {
  handleShowMenuModal: PropTypes.func,
};

RenderBurgerMenuIcon.defaultProps = {
  handleShowMenuModal: () => {
  },
};

export default RenderBurgerMenuIcon;
