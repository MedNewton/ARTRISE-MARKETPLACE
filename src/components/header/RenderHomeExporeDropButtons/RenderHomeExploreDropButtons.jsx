/*eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RenderHomeExploreDropButtons() {
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const toggleExploreDropdown = () => {
    setIsExploreOpen(!isExploreOpen);
  };

  return (
    <nav id="main-nav" className="main-nav">
      <ul id="menu-primary-menu" className="menu">
        <NavItem to="/" text="Home" />

        <li
          className="menu-item menu-item-has-children active"
          onClick={toggleExploreDropdown}
        >
          <Link to="/" onClick={(event) => event.preventDefault()}>Explore</Link>
          {isExploreOpen && (
            <ul className="sub-menu">
              <SubNavItem to="/authors-01" text="Artists" />
              <SubNavItem to="/collections" text="Collections" />
              <SubNavItem to="/explore-01" text="Artworks" />
              <SubNavItem to="/explore" text="Browse" />
            </ul>
          )}
        </li>
        <NavItem to="/drops" text="Drops" />
        {/* Add more menu items here */}
        {/* <NavItem to="/profile" text="Profile" mobileOnly={true} /> */}
      </ul>
    </nav>
  );
}

function NavItem(props) {
  const { to: NavItemTo, text: NavItemText } = props;
  return (
    <li className="menu-item">
      <Link to={NavItemTo} activeClassName="active">
        {NavItemText}
      </Link>
    </li>
  );
}

NavItem.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
};
NavItem.defaultProps = {
  to: '',
  text: '',
};

function SubNavItem(props) {
  const { to: SubNavItemTo, text: SubNavItemText } = props;

  return (
    <li className="menu-item">
      <Link to={SubNavItemTo}>{SubNavItemText}</Link>
    </li>
  );
}

SubNavItem.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
};
SubNavItem.defaultProps = {
  to: '',
  text: '',
};

export default RenderHomeExploreDropButtons;
