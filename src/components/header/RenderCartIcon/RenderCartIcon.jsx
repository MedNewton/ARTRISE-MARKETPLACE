import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import notification from "../../../assets/images/icon/notification.png";
import cart from "../../../assets/images/icon/cart.png";

const RenderCartIcon = () =>{
    return(
        <Dropdown>
            <Dropdown.Toggle id="dropdownCartButton">
                <img className="avatar" style={{padding:'6px', backgroundColor:'white',borderRadius:'inherit'}} src={cart}/>
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