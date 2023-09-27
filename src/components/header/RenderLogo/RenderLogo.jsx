import React from 'react';
import {Link} from "react-router-dom";
import logodark from "../../../assets/images/logo/logo_dark_new.png";
import {useMediaQuery} from "react-responsive";

const RenderLogo = () =>{
    const isDeviceMobile = useMediaQuery({query: '(max-width: 1224px)'})

    return(
        <>
        {isDeviceMobile
            ?
            <div id="site-logo" className="clearfix">
                    <div id="site-logo-inner" className='d-flex'>
                        <Link to="/" rel="home" className="main-logo-mobile-version">
                            <img id="logo_header" src={logodark} alt="ArtRise" style={{width:'auto', height:'auto'}} />
                        </Link>
                        <div className='beta-tag-styles'>Beta</div>
                    </div>
                </div>

            :

            <div id="site-logo" className="clearfix">
                    <div id="site-logo-inner" className='d-flex' style={{gap: '5%'}}>
                        <Link to="/" rel="home" className="main-logo">
                            <img id="logo_header" src={logodark} alt="ArtRise" style={{width:'auto', height:'auto'}} />
                        </Link>
                        <div className='beta-tag-styles'>Beta</div>
                    </div>
                </div>
        }
        </>

    )
}
export default RenderLogo;