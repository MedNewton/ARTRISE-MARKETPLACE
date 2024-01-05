import { FaAngleLeft } from 'react-icons/fa';
import React from 'react';
import PropTypes from 'prop-types';
import HeaderSearch from './HeaderSearch';

function HeaderSearchForMobileView(props) {
  const { setShowSearchField } = props;
  return (
    <div className="header-search-mobile-version">
      <div id="angle-left-icon" style={{ fontSize: 'large' }}><FaAngleLeft /></div>
      <button
        type="button"
        style={{ width: '10%' }}
        onClick={() => {
          setShowSearchField(false);
        }}
        aria-labelledby="angle-left-icon"
      />
      <div style={{ width: '90%' }}>
        <HeaderSearch />
      </div>
    </div>
  );
}

HeaderSearchForMobileView.propTypes = {
  setShowSearchField: PropTypes.func,
};

HeaderSearchForMobileView.defaultProps = {
  setShowSearchField: () => {
  },
};

export default HeaderSearchForMobileView;
