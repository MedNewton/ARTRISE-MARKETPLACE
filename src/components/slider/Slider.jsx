import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/scss';
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';
import mainbg from '../../assets/images/backgroup-secsion/artriseBG.jpg';

function Slider(props) {
  const { data } = props;
  return (
    <div className="mainslider sld">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
      >
        {
                    data?.map((item) => (
                      <SwiperSlide key={item.id} className={item.class}>
                        <SliderItem item={item} />
                      </SwiperSlide>

                    ))
                }
      </Swiper>
    </div>
  );
}
//
// Slider.propTypes = {
//   data: PropTypes.array.isRequired,
//   control: PropTypes.bool,
//   auto: PropTypes.bool,
//   timeOut: PropTypes.number,
// };

Slider.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      class: PropTypes.string,
      // Add other nested prop types as needed (e.g., title_2, title_3, description)
    }),
  ).isRequired,
};

function SliderItem(props) {
  const { item } = props;
  return (
    <div className="flat-title-page home-1 swiper-class" style={{ backgroundImage: `url(${mainbg})` }}>
      <div className="swiper-container mainslider home">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="slider-item">
              <div className="themesflat-container ">
                <div className="wrap-heading flat-slider flex">
                  <div className="content">
                    <h1 className="heading mb-style">
                      <span className="tf-text">{item.title_2}</span>
                    </h1>
                    <h1 className="heading">{item.title_3}</h1>
                    <p className="sub-heading">
                      {item.description}
                    </p>
                    <div className="flat-bt-slider flex style2">
                      <Link to="/masterpieces" className="sc-button header-slider style style-1 rocket fl-button pri-1">
                        <span>
                          Explore
                        </span>
                      </Link>
                      <Link to="/learn" className="sc-button header-slider style style-1 note fl-button pri-1">
                        <span>
                          Learn
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SliderItem.propTypes = {
  item: PropTypes.shape({
    title_2: PropTypes.string.isRequired,
    title_3: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // Add other nested prop types as needed
  }).isRequired,
};

export default Slider;
