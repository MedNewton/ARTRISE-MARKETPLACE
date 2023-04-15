import React from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import TodayPicks from '../components/layouts/TodayPicks';
import todayPickData from '../assets/fake-data/data-today-pick';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import liveAuctionData2 from '../assets/fake-data/data-live-auction-2';
import LiveAuction from '../components/layouts/LiveAuction';
import SideBar from '../components/layouts/home-8/SideBar';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Accordion } from 'react-bootstrap-accordion'
import Artworks from '../components/layouts/artworks';

const PixelizedMosaic = () => {

    

    function showMore(){
        let hiddenText = document.getElementsByClassName('hid');
        hiddenText[0].classList.remove('hid');
        document.getElementById('showMore').classList.add('hid')
    }

    function showLess(){
        let hiddenText = document.getElementsByClassName('rest');
        hiddenText[0].classList.add('hid');
        document.getElementById('showMore').classList.remove('hid');

    }

    return (
        <div>
            <HeaderStyle2 />
            <div className='row collectionHeader'>
                <p className='collectionTitle heading text-center'>Pixelized Mosaic Collection</p>
                
            </div>
            <div className='collectionImage'>
                <img src="" className='collectionImg' alt="" />
            </div>
            
            <section className="tf-section collectionInfo">
                <div className="themesflat-container">
                    <div className='row'>
                        <div className="col-md-6">
                            <div className="heading-live-auctions mg-bt-21">
                                <h2 className="tf-title pad-l-7">
                                    Description
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-6">
                        <div className="widget-social style-3 collectionLinks">
                                <ul>
                                    <li className="style-2"><Link to="#"><i className="fab fa-telegram-plane"></i></Link></li>
                                    <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
                                    <li><Link to="//mobile.twitter.com/yannfaisant_"><i className="fab fa-twitter"></i></Link></li>
                                    <li className="mgr-none"><Link to="//www.facebook.com/YFaisant/"><i className="fab fa-facebook"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                        
                        
                        
                        <div className='col-md-12 blockchainDetails desktopOnly'>
                            <div className="row">
                                <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                                    <h5 className='blockchainDetailsTitle'>Artworks</h5>
                                </div>
                                <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                                    <h5 className='blockchainDetailsTitle'>Created at</h5>
                                </div>
                                <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                                    <h5 className='blockchainDetailsTitle'>Creator fees</h5>
                                </div>
                                
                                
                                
                            </div>
                            <div className="row blockchainDetailsData">
                                <div className="col-md-2">
                                    <h5 className='blockchainDetailsText'>10</h5>
                                </div>
                                <div className="col-md-2">
                                    <h5 className='blockchainDetailsText'>Nov 2022</h5>
                                </div>
                                <div className="col-md-2">
                                    <h5 className='blockchainDetailsText'>10%</h5>
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-md-12 mobileOnly blockchainDetails">
                            <div className='row'>
                                <div className="col-4">
                                    <h5 className='blockchainDetailsTitle'>Artworks</h5>
                                </div>
                                <div className="col-4">
                                    <h5 className='blockchainDetailsTitle'>Created At</h5>
                                </div>
                                <div className="col-4">
                                    <h5 className='blockchainDetailsTitle'>Creator fees</h5>
                                </div>
                            </div>
                            <div className='row blockchainDetailsData'>
                                <div className="col-4 blockchainDetailsText">
                                    <h5 className='blockchainDetailsText'>10</h5>
                                </div>
                                <div className="col-4 blockchainDetailsText">
                                    <h5 className='blockchainDetailsText'>Nov 2022</h5>
                                </div>
                                <div className="col-4 blockchainDetailsText">
                                    <h5 className='blockchainDetailsText'>10%</h5>
                                </div>
                            </div>
                            <div className='sep'></div>
                            
                            <div className='sep'></div>
                            
                        </div>
                        
                        <div className="col-md-12 createdBy">
                            <h5 className='blockchainDetailsTitle'>Created by : <span className='artistName1'><Link to={'/Artists/Yann_Faisant'}>Yann FAISANT</Link></span></h5>
                        </div>
                        <div className='col-md-12'>
                            <p>Pixelized in the form of 21mm mosaic tiles, from meticulously hand-painted glass paste, Yann Faisant's mosaic artworks pay tribute to the great Masters of classical painting from a contemporary perspective.<span id='showMore' onClick={(e) => {showMore()}}> Show more</span></p>
                            <div className='hid rest'>
                                <p>Indeed, the use of the pixel allows the reinvention of the color palette and the reshaping of the material of the painting while preserving the beauty of the original work.</p>
                                <p>Yann Faisant proposes a strong work that blends the best of the classical age with a modern technique.</p>
                                <p>This delightful collection is embedded in the blockchain as an NFT (non-fungible token).</p>
                                <p>Each of the physical artwork is linked to its NFT version realized through the novice NFC tagging technology. <span id='showLess' onClick={(e) => {showLess()}}> Show less</span></p>
                            </div>
                        </div>
                        <div className='col-md-12 blockchainDetails desktopOnly secondBD'>
                            <div className="row">
                                
                                <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                                    <h5 className='blockchainDetailsTitle'>Total sales</h5>
                                </div>
                                <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                                    <h5 className='blockchainDetailsTitle'>Floor price</h5>
                                </div>
                                <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                                    <h5 className='blockchainDetailsTitle '>Owned by</h5>
                                </div>
                                
                                
                            </div>
                            <div className="row blockchainDetailsData">
                                
                                <div className="col-md-2">
                                    <h5 className='blockchainDetailsText BDTXT'>2</h5>
                                </div>
                                <div className="col-md-2">
                                    <h5 className='blockchainDetailsText BDTXT'>3.35ETH</h5>
                                </div>
                                <div className="col-md-2">
                                    <h5 className='blockchainDetailsText BDTXT'>3</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mobileOnly blockchainDetails secondBD">
                            
                            <div className='sep'></div>
                            <div className='row'>
                                <div className="col-4">
                                    <h5 className='blockchainDetailsTitle'>Total sales</h5>
                                </div>
                                <div className="col-4">
                                    <h5 className='blockchainDetailsTitle '>Floor price</h5>
                                </div>
                                <div className="col-4">
                                    <h5 className='blockchainDetailsTitle'>Owned by</h5>
                                </div>
                            </div>
                            <div className='row blockchainDetailsData'>
                                <div className="col-4 blockchainDetailsText">
                                    <h5 className='blockchainDetailsText BDTXT'>2</h5>
                                </div>
                                <div className="col-4 blockchainDetailsText">
                                    <h5 className='blockchainDetailsText BDTXT'>3.35ETH</h5>
                                </div>
                                <div className="col-4 blockchainDetailsText">
                                    <h5 className='blockchainDetailsText BDTXT'>3</h5>
                                </div>
                            </div>
                            <div className='sep'></div>
                            
                        </div>
                    </div>
                </div>
            </section>
            
            <Artworks data={todayPickData} />
            <Footer />
        </div>
    );
}


export default PixelizedMosaic;
