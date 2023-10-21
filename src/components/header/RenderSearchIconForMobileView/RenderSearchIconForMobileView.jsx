import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import search from "../../../assets/images/icon/search.png";

const RenderSearchIconForMobileView = ({setShowSearchField, showSearchField, handleMenuModalClose}) => {
    return (
        <Dropdown>
            <Dropdown.Toggle
                id="dropdownSearchButtonMobileVersion"
                onClick={() => {
                    handleMenuModalClose();
                    setShowSearchField(!showSearchField)
                }}>
                <img className="avatar search-icon-mobile-view-image"
                     src={search}/>
            </Dropdown.Toggle>
        </Dropdown>
    )
}
export default RenderSearchIconForMobileView;