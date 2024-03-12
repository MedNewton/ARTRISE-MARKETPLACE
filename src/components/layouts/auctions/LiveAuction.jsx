import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';
import { v4 as uuidv4 } from 'uuid';

function LiveAuction(props) {
  const { data } = props;
  const [visible, setVisible] = useState(8);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };
  function generateUniqueId() {
    return uuidv4();
  }

  return (
    <section className="tf-section live-auctions">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="tf-title-heading style-1 ct">Upcoming artworks</h2>
          </div>
          {
            data.slice(0, visible)
              .map((item) => (
                <LiveAuctionItem key={generateUniqueId()} item={item} />
              ))
          }
          {
            visible < data.length
            && (
              <div className="col-md-12 wrap-inner load-more text-center">
                <Link
                  to="/"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={showMoreItems}
                >
                  <span>Load More</span>
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
}

LiveAuction.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      img: PropTypes.string,
      wishlist: PropTypes.string,
      tags: PropTypes.string,
      imgAuthor: PropTypes.string,
      nameAuthor: PropTypes.string,
      price: PropTypes.string,
    }),
  ),
};

LiveAuction.defaultProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: '',
      img: '',
      wishlist: '',
      tags: '',
      imgAuthor: '',
      nameAuthor: '',
      price: '',
    }),
  ),
};

function LiveAuctionItem(props) {
  const { item: PropsItem } = props;
  return (
    <div className="fl-item col-xl-3 col-lg-6 col-md-6">
      <div className="sc-card-product">
        <div className="card-media">
          <Link to={{
            pathname: '/item-details-01',
            search: `?title=${PropsItem.title}`,
          }}
          >
            <img src={PropsItem.img} alt="axies" />
          </Link>
          <Link to="/" className="wishlist-button heart">
            <span
              className="number-like"
            >
              {PropsItem.wishlist}
            </span>
          </Link>
          <div className="featured-countdown">
            <span className="slogan" />
            <Countdown date={Date.now() + 500000000}>
              <span>Al!</span>
            </Countdown>
          </div>
          <div className="button-place-bid">
            <Link
              to="/"
              className="sc-button style-place-bid style bag fl-button pri-3"
            >
              <span>Place Bid</span>
            </Link>
          </div>
        </div>
        <div className="card-title">
          <h5>
            <Link to={{
              pathname: '/item-details-01',
              search: `?title=${PropsItem.title}`,
            }}
            >
              {PropsItem.title}
            </Link>
          </h5>
          <div className="tags">{PropsItem.tags}</div>
        </div>
        <div className="meta-info">
          <div className="author">
            <div className="avatar">
              <img src={PropsItem.imgAuthor} alt="axies" />
            </div>
            <div className="info">
              <span>Creator</span>
              <h6>
                {' '}
                <Link to="/">
                  {PropsItem.nameAuthor}
                </Link>
                {' '}

              </h6>
            </div>
          </div>
          <div className="price">
            <span>Current Bid</span>
            <h5>
              {' '}
              {PropsItem.price}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
LiveAuctionItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    img: PropTypes.string,
    wishlist: PropTypes.string,
    tags: PropTypes.string,
    imgAuthor: PropTypes.string,
    nameAuthor: PropTypes.string,
    price: PropTypes.string,

  }),
};

LiveAuctionItem.defaultProps = {
  item: PropTypes.shape({
    title: '',
    img: '',
    wishlist: '',
    tags: '',
    imgAuthor: '',
    nameAuthor: '',
    price: '',

  }),
};

export default LiveAuction;
