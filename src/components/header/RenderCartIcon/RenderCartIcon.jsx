import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import notification from "../../../assets/images/icon/notification.png";
import cart from "../../../assets/images/icon/cart.png";
import {useMediaQuery} from "react-responsive";

const RenderCartIcon = () =>{

        const isDeviceMobile = useMediaQuery({query: '(max-width: 1224px)'})

    return(
        <Dropdown>
            <Dropdown.Toggle id={isDeviceMobile ? "dropdownCartButtonMobileVersion" : "dropdownCartButton"}>
                <img className="avatar cart-icon-mobile-version-image" src={cart}/>
            </Dropdown.Toggle>

            <Dropdown.Menu
                align={"end"}
                style={{ marginTop: "1vh" }}
            >
                <Dropdown.Item>
                    No Items in Cart
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default RenderCartIcon;