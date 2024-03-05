import React from 'react';
import {RiVerifiedBadgeFill} from 'react-icons/ri';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    ArtistInfo, ArtistName, ArtistType,
    CardContainer,
    InfoFollowButtonWrapper,
    InfoSectionWrapper, ProfileImage, ProfileImageWrapper,
} from './craftsmenStyles/ArtistCard.style';
import {ImageGrid} from './ImageGrid';

function ArtistCard({artist, isDeviceMobile, isDeviceTablet}) {
    const theme = useSelector((state) => state.themeReducer.theme);

    return (
        <CardContainer isDeviceMobile={isDeviceMobile} isDeviceTablet={isDeviceTablet} theme={theme}>
            <InfoFollowButtonWrapper>
                <InfoSectionWrapper>
                    <ProfileImageWrapper>
                        <Link to={`/displayProfile?artist=${artist?.userId}`}>

                            <ProfileImage src={artist?.pdpLink} alt=""/>
                            <RiVerifiedBadgeFill fontSize="2.5em" style={{marginLeft: '-10px'}}/>
                        </Link>

                    </ProfileImageWrapper>
                    <ArtistInfo>
                        <ArtistName theme={theme}>{artist?.name}</ArtistName>
                        <ArtistType theme={theme}>
                            {artist?.artistType}
                            {' '}
                        </ArtistType>
                    </ArtistInfo>
                </InfoSectionWrapper>
                <button
                    type="button"
                    id="load-more"
                    className="sc-button loadmore fl-button pri-3"
                    onClick={async (e) => {
                        e.preventDefault();
                    }}
                >
                    <span>Follow</span>
                </button>
            </InfoFollowButtonWrapper>
            <ImageGrid artworkThumbNails={artist.artworkThumbNails}/>
        </CardContainer>

    );
}

ArtistCard.propTypes = {
    artist: PropTypes.shape({
        userId: PropTypes.string,
        pdpLink: PropTypes.string,
        name: PropTypes.string,
        artistType: PropTypes.string,
        artworkThumbNails: PropTypes.arrayOf(PropTypes.string),
    }),
    isDeviceMobile: PropTypes.bool,
    isDeviceTablet: PropTypes.bool,

};

ArtistCard.defaultProps = {
    artist: PropTypes.shape({
        userId: '',
        pdpLink: '',
        name: '',
        artistType: '',
        artworkThumbNails: [],
    }),
    isDeviceMobile: false,
    isDeviceTablet: false,
};
export default ArtistCard;
