import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PropTypes from 'prop-types';

function RenderCloseMenuIcon(props) {
  const { handleMenuModalClose } = props;

  return (
    <>
      <AiOutlineClose id="close-menu-icon" style={{ width: '30px', height: '30px' }} />
      <button
        type="button"
        className="d-flex justify-content-center align-items-center"
        onClick={
                 () => {
                   handleMenuModalClose();
                 }
             }
        aria-labelledby="close-menu-icon"
      />
    </>
  );
}

RenderCloseMenuIcon.propTypes = {
  handleMenuModalClose: PropTypes.func,
};

RenderCloseMenuIcon.defaultProps = {
  handleMenuModalClose: () => {},
};

export default RenderCloseMenuIcon;
