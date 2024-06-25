import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Footer from '../components/footer/Footer';
import ArtistCard from '../components/layouts/craftsmen/ArtistCard';
import { ArtistsContainer } from '../components/layouts/craftsmen/craftsmenStyles/CraftsMen.styles';
import ArtistFilter from '../components/layouts/craftsmen/ArtistFilter';

function Craftsmen() {
  const artistsState = useSelector((state) => state.usersReducer.artists);
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  return (
    <>
      <div className="margin-Left-Right-Top">
        <h2 className=" ourArtists">
          Artists
        </h2>
        <div className="flex flex-column">
          <ArtistFilter />
          <ArtistsContainer isDeviceMobile={isDeviceMobile} isDeviceTablet={isDeviceTablet}>
            {artistsState?.map((artist) => (
              <ArtistCard
                key={artist.userId}
                artist={artist}
                isDeviceMobile={isDeviceMobile}
                isDeviceTablet={isDeviceTablet}
              />
            ))}
          </ArtistsContainer>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Craftsmen;
