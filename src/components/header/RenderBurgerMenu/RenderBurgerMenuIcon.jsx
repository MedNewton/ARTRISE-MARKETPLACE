import React from 'react';
import {FaBars} from "react-icons/fa";


const RenderBurgerMenuIcon = ({handleShowMenuModal}) => {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}} onClick={
            () => {
                handleShowMenuModal()
                console.log("Burger Menu Icon clicked")
            }
        }>
            <FaBars style={{width: "40px", height: "40px"}}/>
        </div>
    )
}
export default RenderBurgerMenuIcon;