import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import notification from "../../../assets/images/icon/notification.png";

const RenderNotifyIcon = () =>{
    return(
        <Dropdown>
            <Dropdown.Toggle id="dropdownNotifButton">
                <img className="avatar" style={{padding:'6px', backgroundColor: 'white'}} src={notification}/>
            </Dropdown.Toggle>
            <Dropdown.Menu
                align={"end"}
                style={{ marginTop: "1vh" }}
            >
                <Dropdown.Item>
                    No new notifications
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default RenderNotifyIcon;