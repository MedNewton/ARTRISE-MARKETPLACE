import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import MediaViewer from '../mediaViewer/MediaViewer';
import {
  ArtworkName, BuyNowButton, BuyNowButtonWrapper,
  Card,
  CardMedia,
  DescriptionTag,
  DescriptionWrapper,
} from './ProfileDisplayStyles/ArtworkCard.styles';

function UnlistedArtworkCard(props) {
  const { listing, showFilter } = props;
  const theme = useSelector((state) => state.themeReducer.theme);
  const navigate = useNavigate();

  const cardOnClickHandler = () => {
    if (
      listing?.listable === 'yes'
      || listing?.listable === true
    ) {
      navigate(`/private-display?id=${listing?.id}`);
    } else if (
      listing?.listable === 'false'
      || listing?.listable === false
       || listing?.listable === ''
    ) {
      navigate(`/artwork-details?id=${listing?.id}`);
    }
  };

  return (
    <Card
      theme={theme}
      showFilter={showFilter}
      key={listing?.id}
      unlistedCard
      onClick={cardOnClickHandler}
    >
      <CardMedia>
        <ArtworkName>{listing?.data?.name}</ArtworkName>
        <MediaViewer mediaUrl={listing?.data?.image} />
      </CardMedia>
      <DescriptionWrapper>
        <DescriptionTag>{listing?.data?.description}</DescriptionTag>
      </DescriptionWrapper>
      <BuyNowButtonWrapper>
        <BuyNowButton
          theme={theme}
          onClick={async (e) => {
            e.preventDefault();
          }}
        >
          {listing?.listable ? 'List Now' : 'View Listing'}
        </BuyNowButton>
      </BuyNowButtonWrapper>
    </Card>
  );
}

UnlistedArtworkCard.propTypes = {
  listing: PropTypes.shape({
    listable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    id: PropTypes.string,
    data: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
  showFilter: PropTypes.bool,
};

UnlistedArtworkCard.defaultProps = {
  listing: PropTypes.shape({
    listable: '',
    id: '',
    data: PropTypes.shape({
      name: '',
      image: '',
      description: '',
    }),
  }),
  showFilter: false,
};

export default UnlistedArtworkCard;
