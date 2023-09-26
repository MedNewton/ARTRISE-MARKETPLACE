import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import search from "../../../assets/images/icon/search.png";

const RenderSearchIconForMobileView = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdownSearchButton">
                <img className="avatar" style={{padding: '6px', backgroundColor: 'white', borderRadius: 'inherit'}}
                     src={search}/>
            </Dropdown.Toggle>
            <Dropdown.Menu
                align={"end"}
                style={{marginTop: "1vh"}}
            >
                <Dropdown.Item>
                    No Items in Cart
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default RenderSearchIconForMobileView;