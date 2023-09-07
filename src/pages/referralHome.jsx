import React, {useRef, useState, useEffect} from "react";
import {Link, useNavigate, withRouter} from "react-router-dom";
import Header from "../components/header/Header";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import avt from "../assets/images/avatar/avata_profile.jpg";
import bg1 from "../assets/images/backgroup-secsion/option1_bg_profile.jpg";
import bg2 from "../assets/images/backgroup-secsion/option2_bg_profile.jpg";
import db from "../firebase";
import storage from "../storage";
import {ref, onValue, get, update, set, child} from "firebase/database";
import {ConnectWallet, useAddress} from "@thirdweb-dev/react";

import Table from "react-bootstrap/Table";

import {
    ref as SRef,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";

import ReferralModal from "../components/layouts/referralModal";

const ReferralHome = () => {
    const [createModalShow, setCreateModalShow] = useState(false);

    return (
        <div>
            <HeaderStyle2/>
            <div className='referral-home-wrapper'>
                <div className='flex-column-gap20'>
                    <div>
                        <h3>Referral</h3>
                    </div>
                    <div className='flex-row-align-center' style={{width: '100%', gap: "5%"}}>
                        <div style={{width: '40%'}}>
                            <div className="referralImage"></div>
                        </div>
                        <div className='flex-column-gap20' style={{width: '60%'}}>
                            <h4>
                                Integrate Your artwork
                            </h4>
                            <h6>
                                Integrate your original physical artwork and turn
                                it into a Hybrid NFT. Simply upload a photo of
                                your artwork, fill out the artwork details and
                                properties and we'll take care of the rest.
                            </h6>
                            <button
                                className="refer-friend-button"
                                id="submitBtn"
                                type="button"
                                onClick={() => {
                                    setCreateModalShow(true);
                                }}
                            >
                                Refer a friend
                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex-column-gap20'>
                    <div>
                        <h3>Referral rewards</h3>
                    </div>
                    <div className='flex-row-align-center' style={{width: '100%', gap: "5%"}}>
                        <div style={{width: '40%'}}>
                            <div className="referralImage"></div>
                        </div>
                        <div className='flex-column-gap20' style={{width: '60%'}}>
                            <h4>
                                Refer a friend to become member
                            </h4>
                            <h6>
                                Inviter reward:
                            </h6>
                            <h6>
                                Invitee reward:
                            </h6>
                        </div>
                    </div>

                    <div className='flex-row-align-center' style={{width: '100%', gap: "5%"}}>
                        <div style={{width: '40%'}}>
                            <div className="referralImage"></div>
                        </div>
                        <div className='flex-column-gap20' style={{width: '60%'}}>
                            <h4>
                                Refer a friend to become artist
                            </h4>
                            <h6>
                                Inviter reward:
                            </h6>
                            <h6>
                                Invitee reward:
                            </h6>
                        </div>
                    </div>
                </div>

                <div className="referralInbfoBox flex-column-gap20">
                    <h3>Activity</h3>
                    <Table striped bordered hover responsive style={{
                        borderRadius: "15px"
                    }}>
                        <thead>
                        <tr>
                            <th>Referred</th>
                            <th>Type</th>
                            <th>Reward</th>
                            <th>Collected</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>BVRTS</td>
                            <td>Artist</td>
                            <td>1% of artist's sale</td>
                            <td>40$</td>
                            <td>23/05/23</td>
                        </tr>
                        <tr>
                            <td>Luiji</td>
                            <td>Member</td>
                            <td>1% of artist's sale</td>
                            <td>20$</td>
                            <td>18/05/23</td>
                        </tr>
                        <tr>
                            <td>BVRTS</td>
                            <td>Artist</td>
                            <td>1% of artist's sale</td>
                            <td>40$</td>
                            <td>23/05/23</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

            <ReferralModal
                show={createModalShow}
                onHide={() => setCreateModalShow(false)}
            />
            <Footer/>
        </div>
    );
};

export default ReferralHome;
