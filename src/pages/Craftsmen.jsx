import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Footer from '../components/footer/Footer';
import ArtistCard from '../components/layouts/craftsmen/ArtistCard';
import { ArtistsContainer } from '../components/layouts/craftsmen/craftsmenStyles/CraftsMen.styles';

function Craftsmen() {
  const artistsState = useSelector((state) => state.usersReducer.artists);
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  const selectedTags = [];

  function editTags(val, target) {
    if (selectedTags.includes(val)) {
      selectedTags.pop(val);
      target.classList.remove('selectedTag');
      target.classList.add('tag');
    } else {
      selectedTags.push(val);
      target.classList.remove('tag');
      target.classList.add('selectedTag');
    }
  }

  return (
    <>
      <div className="margin-Left-Right-Top">
        <h2 className=" ourArtists">
          Artists
        </h2>
        <div className="flex flex-column">
          <div className="tagsBar flex">
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="painter"
            >
              Painter
            </button>
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="photographer"
            >
              Photographer
            </button>
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="sculpturer"
            >
              Sculpturer
            </button>
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="ceramic_artist"
            >
              Ceramic artist
            </button>
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="others"
            >
              Others
            </button>
          </div>
          {/* <div className="row"> */}
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
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Craftsmen;
