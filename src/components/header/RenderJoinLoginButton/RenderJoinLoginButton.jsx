import React from 'react';
import {Link} from "react-router-dom";
import logodark from "../../../assets/images/logo/logo_dark_new.png";
import DarkMode from "../DarkMode";

const RenderJoinLoginButton = ({setJoinChoicesModalOpen, setLoginModalOpen}) =>{
    return(
        <div className="nonConnectedBtnBox">
            <div className="nonConnectedBtns">
                <Link
                    to="/"
                    onClick={(e) => {
                        e.preventDefault();
                        setJoinChoicesModalOpen(true);
                    }}
                    className="nonConnectedJoinBtn"
                >
                    <span>Join</span>
                </Link>
                <Link
                    to="/"
                    onClick={(e) => {
                        e.preventDefault();
                        setLoginModalOpen(true);
                    }}
                    className="nonConnectedLoginBtn"
                >
                    <span>Login</span>
                </Link>
                <DarkMode/>
            </div>

        </div>
    )
}
export default RenderJoinLoginButton;