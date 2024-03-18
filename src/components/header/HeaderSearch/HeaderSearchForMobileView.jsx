import React from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowBack } from 'react-icons/io';
import HeaderSearch from './HeaderSearch';
import { SearchButton } from '../HeaderStyles/HeaderSearchForMobileView.style';

function HeaderSearchForMobileView(props) {
  const { setShowSearchField } = props;
  return (
    <div className="header-search-mobile-version">
      <SearchButton
        onClick={() => {
          setShowSearchField(false);
        }}
      >
        <IoIosArrowBack style={{ fontSize: 'xx-large' }} />
      </SearchButton>
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
