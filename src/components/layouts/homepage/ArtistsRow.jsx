import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import profile from '../../../assets/images/icon/profile.png';
import { ArtistsProfilesWrapper } from './ArtistsRow.style';

function ArtistsRow() {
  const artistsState = useSelector((state) => state.usersReducer.artists);
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  // List of userIds to render
  const allowedUserIds = [
    '0x9DAbcEe90F98D5831486440aD6E18b6cE0f7225B',
    '0xC4E786Fc836F8F13063e25a92bcFa5aA5FA5424D',
    '0xE9Fa3f8ED24c60b625097D102139934dDcDb7d6E',
  ];

  const filteredArtists = artistsState?.filter((artist) => allowedUserIds.includes(artist?.userId));

  return (
    <ArtistsProfilesWrapper isDeviceMobile={isDeviceMobile} isDeviceTablet={isDeviceTablet}>
      {filteredArtists?.map((artist) => (
        <Link to={`/displayProfile?artist=${artist?.userId}`} key={artist?.userId}>
          <div className="pdpSpace artistButton" id="pdp">
            <img
              src={artist?.pdpLink ? artist?.pdpLink : profile}
              alt="User Profile"
            />
          </div>
        </Link>
      ))}
    </ArtistsProfilesWrapper>
  );
}

export default ArtistsRow;
