import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import CardModal from './CardModal';
import yann from '../../assets/images/avatar/yann.png';

// import 'swiper/scss';
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';

function ComingSoon(props) {
  const { data } = props;
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <>
        <h2 className=" ourArtists" style={{ margin: '25px 0px' }}>
          Upcoming Artworks
        </h2>
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
                            data.slice(0, 7)
                              .map((item) => (
                                <SwiperSlide key={item?.id ? item?.id : item}>
                                  <div className="swiper-container show-shadow carousel auctions">
                                    <div className="swiper-wrapper">
                                      <div className="swiper-slide">
                                        <div className="slider-item">
                                          <div className="sc-card-product">
                                            <div className="card-media">
                                              <img src={item.img} alt="" />

                                              <div className="button-place-bid">
                                                <button
                                                  type="button"
                                                  className="sc-button style-place-bid style bag fl-button pri-3"
                                                >
                                                  <span>Coming Soon!</span>
                                                </button>
                                              </div>
                                            </div>
                                            <div className="card-title">
                                              <h5>
                                                <Link to={{
                                                  pathname: '/item-details-01',
                                                  search: `?title=${item.title}`,
                                                }}
                                                >
                                                  &quot;
                                                  {item.title}
                                                  &quot;
                                                </Link>
                                              </h5>
                                              <div className="tags">{item.tags}</div>
                                            </div>
                                            <div className="meta-info">
                                              <div className="author">
                                                <div className="avatar">
                                                  <img src={yann} alt="" />
                                                </div>
                                                <div className="info">
                                                  <span>Creator</span>
                                                  <h6>
                                                    {' '}
                                                    <Link to="/">
                                                      {item.nameAuthor}
                                                    </Link>
                                                    {' '}
                                                  </h6>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              ))
                        }
          </Swiper>
        </div>
      </>
      <CardModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>

  );
}

ComingSoon.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.string,
        img: PropTypes.string,
        title: PropTypes.string,
        tags: PropTypes.string,
        imgAuthor: PropTypes.string,
        nameAuthor: PropTypes.string,
        price: PropTypes.string,
        priceChange: PropTypes.string,
        wishlist: PropTypes.string,
        imgCollection: PropTypes.string,
        nameCollection: PropTypes.string,
      },
    ),
  ),
};

ComingSoon.defaultProps = {
  data: [],
};

export default ComingSoon;
