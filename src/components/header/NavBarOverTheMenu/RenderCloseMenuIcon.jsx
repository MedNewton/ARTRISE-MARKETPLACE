import React from 'react';
import {AiOutlineClose} from "react-icons/ai";

const RenderCloseMenuIcon = ({handleMenuModalClose}) => {
    return (
        <div className="d-flex justify-content-center align-items-center"
             onClick={
                 () => {
                     handleMenuModalClose()
                 }
             }>
            <AiOutlineClose style={{width: "30px", height: "30px"}}/>
        </div>
    )
}
export default RenderCloseMenuIcon;