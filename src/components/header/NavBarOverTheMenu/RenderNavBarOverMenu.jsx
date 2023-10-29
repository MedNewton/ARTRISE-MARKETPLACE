import RenderLogo from "../RenderLogo/RenderLogo";
import RenderSearchIconForMobileView from "../RenderSearchIconForMobileView/RenderSearchIconForMobileView";
import DarkMode from "../DarkMode";
import React from "react";
import RenderCloseMenuIcon from "./RenderCloseMenuIcon";

const RenderNavBarOverMenu = ({
                                  setShowSearchField,
                                  showSearchField,
                                  handleMenuModalClose
                              }) => {
    return (
        <div className="navbar-mobile-version-wrapper">
            <div
                className="navbar-left-half-mobile-version-wrapper">
                <RenderLogo/>
            </div>
            <div className="navbar-right-half-mobile-version-wrapper">
                <RenderSearchIconForMobileView
                    setShowSearchField={setShowSearchField}
                    showSearchField={showSearchField}
                    handleMenuModalClose={handleMenuModalClose}
                />
                <DarkMode/>
                <RenderCloseMenuIcon handleMenuModalClose={handleMenuModalClose}/>

            </div>
        </div>
    )
}
export default RenderNavBarOverMenu;
