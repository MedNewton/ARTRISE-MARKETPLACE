import {FaAngleLeft} from "react-icons/fa";
import HeaderSearch from "./HeaderSearch";
import React from "react";

const HeaderSearchForMobileView = ({setShowSearchField}) => {
    return (
        <div className="header-search-mobile-version">
            <div style={{width: "10%"}} onClick={() => {
                setShowSearchField(false)
            }}>
                <div style={{fontSize: "large"}}><FaAngleLeft/></div>
            </div>
            <div style={{width: "90%"}}>
                <HeaderSearch/>
            </div>
        </div>
    )
}
export default HeaderSearchForMobileView;