import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import search from '../../../assets/images/icon/search.png';

function RenderSearchIconForMobileView(props) {
  const { setShowSearchField, showSearchField, handleMenuModalClose } = props;
  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdownSearchButtonMobileVersion"
        onClick={() => {
          handleMenuModalClose();
          setShowSearchField(!showSearchField);
        }}
      >
        <img
          className="avatar search-icon-mobile-view-image"
          src={search}
          alt="search icon"
        />
      </Dropdown.Toggle>
    </Dropdown>
  );
}

RenderSearchIconForMobileView.propTypes = {
  setShowSearchField: PropTypes.func,
  showSearchField: PropTypes.bool,
  handleMenuModalClose: PropTypes.func,
};

RenderSearchIconForMobileView.defaultProps = {
  setShowSearchField: () => {},
  showSearchField: false,
  handleMenuModalClose: () => {},
};

export default RenderSearchIconForMobileView;
