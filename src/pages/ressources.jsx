import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';



const Ressources = () => {
    return (
        <div>
            <HeaderStyle2 />
            <div className="tf-create-item tf-section">
                <div className="themesflat-container">
                    <div className="row profilePadding " style={{display: "flex", flexDirection: "column"}}>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/website-launching-coming-soon-2112253-1782224.png" alt="" style={{width: "60vw", height: "auto", marginLeft: "auto", marginRight: "auto", marginTop: "5vh"}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ressources;