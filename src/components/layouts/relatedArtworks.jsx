import React , { useState , Fragment } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Countdown from "react-countdown";
import CardModal from './CardModal'
import yann from "../../assets/images/avatar/yann.jpg"
import { useAddress, useContract, useListings } from "@thirdweb-dev/react";

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const RelatedArtworks = props => {
    const data = props.data;

    const {contract} = useContract("0x3ad7E785612f7bcA47e0d974d08f394d78B4b955", "marketplace");
    const { data: listings, isLoading, error } = useListings(contract);

    const [modalShow, setModalShow] = useState(false);

    return (
        <Fragment>
            <section className="tf-section live-auctions">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title pb-20">
                                    Related artworks</h2>
                            </div>
                        </div>

                        <div className="col-md-12 AuctionsBg">
                        
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={30}

                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    767: {
                                    slidesPerView: 2,
                                    },
                                    991: {
                                    slidesPerView: 3,
                                    },
                                    1300: {
                                        slidesPerView: 4,
                                    },
                                }}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                            >
                                {
                                    !isLoading && listings ? (
                                        listings?.map((listing, index) => {
                                            if((listing.id != 0) && (listing.id != 17) && (listing.id != 21) && (listing.id >= 16)){
                                                return (
                                                    <SwiperSlide key={index}>
                                                    <div className="swiper-container show-shadow carousel auctions">
                                                        <div className="swiper-wrapper">
                                                            <div className="swiper-slide">
                                                                <div className="slider-item">										
                                                                    <div className="sc-card-product">
                                                                        <div className="card-media">
                                                                            <img src={listing.asset.image} alt="" />
                                                                        </div>
                                                                        <div className="card-title">
                                                                            <h5><Link to={{pathname: "/item-details-01", search: `?listing=${listing.id}` }}>"{listing.asset.name}"</Link></h5>
                                                                            
                                                                        </div>
                                                                        <div className="meta-info">
                                                                            <div className="author">
                                                                                <div className="avatar">
                                                                                    <img src={yann} alt="" />
                                                                                </div>
                                                                                <div className="info">
                                                                                    <span>Creator</span>
                                                                                    <h6> <Link to="/Artists/Yann_Faisant">{"Yann Faisant"}
                                                                                    </Link> </h6>
                                                                                </div>
                                                                            </div>
                                    
                                                                        </div>
                                                                    </div>    	
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </SwiperSlide>
                                                )
                                            }
                                        })
                                    ) : (
                                        <div>
                                            <img src="https://media.tenor.com/eL-cXQYmRjQAAAAM/loading-load.gif" className='loadingGIF'></img>
                                        </div>
                                    )
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            <CardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Fragment>
        
    );
}

RelatedArtworks.propTypes = {
    data: PropTypes.array.isRequired,
}


export default RelatedArtworks;
