import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import MediaViewer from '../mediaViewer/MediaViewer';
import {
  ArtworkName, BuyNowButton, BuyNowButtonWrapper,
  Card,
  CardContent,
  CardMedia,
  CreatorInfo,
  PriceHeading, PriceSectionWrapper,
  PriceTag,
} from './ProfileDisplayStyles/ArtworkCard.styles';

function ArtworkCard(props) {
  const { artwork, showFilter } = props;
  const [usdPriceInEth, setUsdPriceInEth] = useState();
  const theme = useSelector((state) => state.themeReducer.theme);
  const navigate = useNavigate();
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  const fetchPrice = useCallback(async () => {
    const response = await axios.get(
      'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
    );
    setUsdPriceInEth(parseFloat(response.data.USD));
  }, []);

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  const cardOnClickHandler = () => {
    if (artwork?.listed === 'yes' || artwork?.listed === true) {
      navigate(`/artwork-details?id=${artwork.artworkId}`);
    } else if (artwork?.listed === 'false' || artwork?.listed === false || artwork?.listed === '') {
      navigate(`/artwork-details?id=${artwork.artworkId}`);
    }
  };

  return (
    <Card
      isDeviceMobile={isDeviceMobile}
      isDeviceTablet={isDeviceTablet}
      theme={theme}
      showFilter={showFilter}
      key={artwork.artworkId}
      onClick={cardOnClickHandler}
    >
      <CardMedia>
        <ArtworkName>{artwork.data.name}</ArtworkName>
        <MediaViewer mediaUrl={artwork?.data?.image} />
      </CardMedia>
      <CardContent>
        <CreatorInfo>
          <img src={artwork.ownerImage} alt={artwork.ownerName} />
          <span>{artwork.ownerName}</span>
        </CreatorInfo>
        <PriceSectionWrapper>
          <PriceHeading>Price</PriceHeading>
          <PriceTag>
            {(artwork.price * usdPriceInEth).toFixed(2)}
            {' '}
          &nbsp;
            {' ≈ '}
            {' '}
          &nbsp;
            {artwork.price}
            {' '}
            ETH
          </PriceTag>
        </PriceSectionWrapper>
        <BuyNowButtonWrapper>
          <BuyNowButton
            theme={theme}
            onClick={async (e) => {
              e.preventDefault();
            }}
          >
            {artwork?.listed ? 'Buy Now' : 'List Now'}
          </BuyNowButton>
        </BuyNowButtonWrapper>
      </CardContent>
    </Card>
  );
}

ArtworkCard.propTypes = {
  artwork: PropTypes.shape({
    listed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ownerName: PropTypes.string,
    ownerImage: PropTypes.string,
    artworkId: PropTypes.string,
    DisplayArtworks: PropTypes.string,
    data: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  }),
  showFilter: PropTypes.bool,
};

ArtworkCard.defaultProps = {
  artwork: PropTypes.shape({
    listed: '',
    price: '',
    ownerName: '',
    ownerImage: '',
    artworkId: '',
    DisplayArtworks: '',
    data: PropTypes.shape({
      name: '',
      image: '',
    }),
  }),
  showFilter: false,
};

export default ArtworkCard;
