import React from 'react';
import {FaBars} from "react-icons/fa";


const RenderBurgerMenuIcon = ({handleShowMenuModal}) => {
    return (
        <div className="d-flex justify-content-center align-items-center"
             onClick={
            () => {
                handleShowMenuModal()
            }
        }>
            <FaBars style={{width: "30px", height: "30px"}}/>
        </div>
    )
}
export default RenderBurgerMenuIcon;