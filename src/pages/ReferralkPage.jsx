import React , { useState } from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import { Accordion } from 'react-bootstrap-accordion'

const ReferralPage = () => {
    const [data] = useState(
        [
            {   key: "0",
                show: "show",
                title: 'Up to 10 invitee',
                text: 'Inviter gets 15% on every invitee purchase, invitee gets 3% off on first sale.'
            },
            {
                key: "1",
                title: 'Up to 50 invitee',
                text: 'Inviter gets 20% on every invitee purchase, invitee gets 5% off on first sale.'
            },
            {
                key: "2",
                title: 'Up to 100 invitee',
                text: 'Inviter gets 25% on every invitee purchase, invitee gets 7% off on first sale.'
            },
            {
                key: "3",
                title: 'More than 100 invitee',
                text: 'Inviter gets 30% on every invitee purchase, invitee gets 10% off on first sale.'
            },
        ]
    )

    const [data2] = useState(
        [
            {   key: "0",
                show: "show",
                title: 'Artists',
                text: 'Whenever an artists gets referred by another artist, and is fully integrated on Artrise, each one of them gets a free artwork tokenization.'
            },
            {
                key: "1",
                title: 'Influencers',
                text: 'Every influencer can promote Artrise and its artworks on social media or any other bias, and get 10% of the affiliate sale as a reward.'
            },
        ]
    )
    return (
        <div>
            <HeaderStyle2 />
            
            <section className="tf-section wrap-accordion">
                <div className="container">
                    <div className="row mrgTopSection">
                        <div className="col-md-12">
                        <h2 className="tf-title style2 fs-30 mg-bt-60">
                        Referral program
                                </h2>
                            
                            <h5 className="sub-title help-center mg-bt-32 ">
                            Artrise users can have a new source of earning simply by inviting their friends to join our platform.

                            </h5>
                            <h5 className="sub-title help-center mg-bt-32 ">
                            Artrise referral program offers rewards to inviter for every NFT sold in the store that is registered from the inviter's referral link, for up to 6 months. The more artists and friends you refer, the more you can earn. What's even better is that both you and your friends can earn the reward. Everybody wins!

                            </h5>

                            
                            
                            <h4 className="tf-title-heading ct style-2 fs-30 mg-bt-30">
                            Detailed reward rules are simple as follows:

                            </h4>
                        </div>
                        
                        <div className="col-md-12">
                            <div className="flat-accordion2">
                                {
                                    data.map((item,index) => (
                                        <Accordion key={index} title={item.title} >
                                            <p>{item.text}</p>
                                        </Accordion>
                                    ))
                                }                             
                            </div>
                        </div>

                        <div className="col-md-12">
                        <h4 className="tf-title-heading ct style-2 fs-30 mg-bt-30">
                        Artists & influencers have a special referral program:

                            </h4>
                        </div>
                        
                            <div className="col-md-12">
                                <div className="flat-accordion2">
                                    {
                                        data2.map((item,index) => (
                                            <Accordion key={index} title={item.title} >
                                                <p>{item.text}</p>
                                            </Accordion>
                                        ))
                                    }                             
                                </div>
                            </div>
                        
                        
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default ReferralPage;
