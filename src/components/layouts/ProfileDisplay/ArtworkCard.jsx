import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MediaViewer from '../mediaViewer/MediaViewer';
import {
  ArtworkName,
  Card,
  CardContent,
  CardMedia,
  CreatorInfo,
  PriceHeading,
  PriceTag,
} from './ProfileDisplayStyles/ArtworkCard.styles';

function ArtworkCard(props) {
  const { artwork } = props;
  const [usdPriceInEth, setUsdPriceInEth] = useState();
  const theme = useSelector((state) => state.themeReducer.theme);

  const fetchPrice = useCallback(async () => {
    const response = await axios.get(
      'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
    );
    setUsdPriceInEth(parseFloat(response.data.USD));
  }, []);

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  return (
    <Card theme={theme} key={artwork.data.name}>
      <CardMedia>
        <ArtworkName>{artwork.data.name}</ArtworkName>
        <MediaViewer mediaUrl={artwork?.data?.image} />
      </CardMedia>
      <CardContent>
        <CreatorInfo>
          <img src={artwork.ownerImage} alt={artwork.ownerName} />
          <span>{artwork.ownerName}</span>
        </CreatorInfo>
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
      </CardContent>
    </Card>
  );
}

ArtworkCard.propTypes = {
  artwork: PropTypes.shape({
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
};

ArtworkCard.defaultProps = {
  artwork: PropTypes.shape({
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
};

export default ArtworkCard;
