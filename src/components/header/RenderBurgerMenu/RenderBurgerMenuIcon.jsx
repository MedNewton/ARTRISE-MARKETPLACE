import React from 'react';
import { FaBars } from 'react-icons/fa';
import PropTypes from 'prop-types';

function RenderBurgerMenuIcon(props) {
  const { handleShowMenuModal } = props;

  return (
    <>
      <FaBars
        id="burger-menu-icon"
        style={{
          width: '30px',
          height: '30px',
        }}
      />
      <button
        type="button"
        className="d-flex justify-content-center align-items-center"
        onClick={
          () => {
            handleShowMenuModal();
          }
        }
        aria-labelledby="burger-menu-icon"

      />
    </>

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
