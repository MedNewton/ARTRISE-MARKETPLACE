import React from 'react';
import PropTypes from 'prop-types';
import RenderLogo from '../RenderLogo/RenderLogo';
import RenderSearchIconForMobileView from '../RenderSearchIconForMobileView/RenderSearchIconForMobileView';
import DarkMode from '../DarkMode';
import RenderCloseMenuIcon from './RenderCloseMenuIcon';

function RenderNavBarOverMenu(props) {
  const {
    setShowSearchField,
    showSearchField,
    handleMenuModalClose,
  } = props;

  return (
    <div className="navbar-mobile-version-wrapper">
      <div
        className="navbar-left-half-mobile-version-wrapper"
      >
        <RenderLogo />
      </div>
      <div className="navbar-right-half-mobile-version-wrapper">
        <RenderSearchIconForMobileView
          setShowSearchField={setShowSearchField}
          showSearchField={showSearchField}
          handleMenuModalClose={handleMenuModalClose}
        />
        <DarkMode />
        <RenderCloseMenuIcon handleMenuModalClose={handleMenuModalClose} />

      </div>
    </div>
  );
}

RenderNavBarOverMenu.propTypes = {
  setShowSearchField: PropTypes.func,
  showSearchField: PropTypes.bool,
  handleMenuModalClose: PropTypes.func,
};

RenderNavBarOverMenu.defaultProps = {
  setShowSearchField: () => {},
  showSearchField: false,
  handleMenuModalClose: () => {},
};

export default RenderNavBarOverMenu;
