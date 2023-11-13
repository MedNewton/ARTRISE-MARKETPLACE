import React from 'react';
import {Link} from "react-router-dom";
import logodark from "../../../assets/images/logo/logo_dark_new.png";
import {useMediaQuery} from "react-responsive";

const RenderLogo = () => {
    const isDeviceMobile = useMediaQuery({query: '(max-width: 1224px)'})

    return (
        <>
            {isDeviceMobile
                ?
                <div className="d-flex flex-row align-items-center">
                    <div className="d-flex">
                        <div style={{width: "50%"}} className="main-logo-mobile-version">
                            <Link to="/">
                                <img src={logodark} alt="ArtRise"/>
                            </Link>
                        </div>
                        <div className='beta-tag-styles'>Beta</div>
                    </div>
                </div>

                :

                <div id="site-logo" className="clearfix">
                    <div id="site-logo-inner" className='d-flex' style={{gap: '4%'}}>
                        <Link to="/" rel="home" className="main-logo">
                            <img id="logo_header" src={logodark} alt="ArtRise" style={{width: '90%', height: 'auto'}}/>
                        </Link>
                        <div className='beta-tag-styles'>Beta</div>
                    </div>
                </div>
            }
        </>

    )
}
export default RenderLogo;