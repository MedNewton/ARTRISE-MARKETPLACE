import React, { useState } from "react";
import { Link } from "react-router-dom";

const RenderHomeExploreDropButtons = () => {
    const [isExploreOpen, setIsExploreOpen] = useState(false);

    const toggleExploreDropdown = () => {
        setIsExploreOpen(!isExploreOpen);
    };

    return (
        <nav id="main-nav" className="main-nav">
            <ul id="menu-primary-menu" className="menu">
                <NavItem to="/" text="Home" />
                <li
                    className={`menu-item menu-item-has-children active`}
                    onClick={toggleExploreDropdown}
                >
                    <Link to="/" onClick={(event)=>event.preventDefault()}>Explore</Link>
                    {isExploreOpen && (
                        <ul className="sub-menu">
                            <SubNavItem to="/authors-01" text="Artists" />
                            <SubNavItem to="/collections" text="Collections" />
                            <SubNavItem to="/explore-01" text="Artworks" />
                            <SubNavItem to="/home-08" text="Browse" />
                        </ul>
                    )}
                </li>
                <NavItem to="/drops" text="Drops" />
                {/* Add more menu items here */}
                {/* <NavItem to="/profile" text="Profile" mobileOnly={true} /> */}
            </ul>
        </nav>
    );
};

const NavItem = ({ to, text, mobileOnly }) => {
    return (
        <li className="menu-item">
            <Link to={to} activeClassName="active">
                {text}
            </Link>
        </li>
    );
};

const SubNavItem = ({ to, text }) => {
    return (
        <li className="menu-item">
            <Link to={to}>{text}</Link>
        </li>
    );
};

export default RenderHomeExploreDropButtons;



