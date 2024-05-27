import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  Tab, TabList, TabPanel, Tabs,
} from '../tab/Tabs';
import DropsRaw from '../dropsRaw';
import DisplayArtworks from '../ProfileDisplay/DisplayArtworks';
import ArtistCard from '../craftsmen/ArtistCard';
import { ArtistsContainer } from '../craftsmen/craftsmenStyles/CraftsMen.styles';

function BrowserPageContent() {
  const collections = useSelector((state) => state.usersReducer.collections);
  const lazyListed = useSelector((state) => state.usersReducer.lazyListed);
  const artistsState = useSelector((state) => state.usersReducer.artists);
  const theme = useSelector((state) => state.themeReducer.theme);

  const isDeviceMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  const dataTab = [
    {
      key: 0,
      name: 'Artworks',
    },
    {
      key: 1,
      name: 'Collections',
    },
    {
      key: 2,
      name: 'Artists',
    },
    {
      key: 3,
      name: 'Drops',
    },
  ];

  const [visible, setVisible] = useState(15);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 5);
  };

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

  // code for tags enabling

  // const selectedCollectionTags = [];

  // function editTags(val, target) {
  //   if (selectedCollectionTags.includes(val)) {
  //     selectedCollectionTags.pop(val);
  //     target.classList.remove('selectedTag');
  //     target.classList.add('tag');
  //   } else {
  //     selectedCollectionTags.push(val);
  //     target.classList.remove('tag');
  //     target.classList.add('selectedTag');
  //   }
  // }

  // const selectedArtistTags = [];

  // function editArtistTags(val, target) {
  //   if (selectedArtistTags.includes(val)) {
  //     selectedArtistTags.pop(val);
  //     target.classList.remove('selectedTag');
  //     target.classList.add('tag');
  //   } else {
  //     selectedArtistTags.push(val);
  //     target.classList.remove('tag');
  //     target.classList.add('selectedTag');
  //   }
  // }

  return (
    <Tabs>
      <TabList theme={theme} isDeviceMobile={isDeviceMobile}>
        {dataTab.map((item) => (
          <Tab index={item.key} theme={theme}>
            {item.name}
          </Tab>
        ))}
      </TabList>

      <TabPanel index={0}>
        {lazyListed && <DisplayArtworks data={lazyListed} />}
      </TabPanel>
      <TabPanel index={1}>
        <>
          <div className="row tagsBar">
            <div className="col-12 flex">
              <button
                type="button"
                className="tag"
                onClick={(e) => editTags(e.target.id, e.target)}
                onKeyDown={(e) => editTags(e.target.id, e.target)}
                id="painter"
              >
                Painting
              </button>
              <button
                type="button"
                className="tag"
                onClick={(e) => editTags(e.target.id, e.target)}
                onKeyDown={(e) => editTags(e.target.id, e.target)}
                id="photographer"
              >
                Photography
              </button>
              <button
                type="button"
                className="tag"
                onClick={(e) => editTags(e.target.id, e.target)}
                onKeyDown={(e) => editTags(e.target.id, e.target)}
                id="sculpturer"
              >
                Sculpture
              </button>
              <button
                type="button"
                className="tag"
                onClick={(e) => editTags(e.target.id, e.target)}
                onKeyDown={(e) => editTags(e.target.id, e.target)}
                id="ceramic_artist"
              >
                Mosaic
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
          </div>
          <div className="row">
            {
              collections?.slice(0, visible).map((collection) => (
                <div key={collection?.id} className="col-lg-4 col-md-6 col-12">
                  <div className="sc-card-collection style-2">
                    <div className="card-bottom">
                      <div className="author">
                        <div className="sc-author-box style-2">
                          <div className="author-avatar">
                            <img
                              src={collection.owner_image}
                              alt=""
                              className="avatar"
                            />
                            <div className="badge" />
                          </div>
                        </div>
                        <div className="content">
                          <h4>
                            <Link to={`/collection?id=${collection?.id}`}>
                              {collection.name}
                            </Link>
                          </h4>
                          <p>
                            By
                            {' '}
                            <Link
                              to={`/displayProfile?${collection?.owner_profile_type}=${collection?.owner}`}
                            >
                              <span
                                className="authorName"
                              >
                                {collection?.owner_name}
                              </span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link to={`/collection?id=${collection?.id}`}>
                      <div className="media-images-collection">
                        <div className="box-left">
                          <img
                            src={collection.cover}
                            alt=""
                          />
                        </div>
                        <div className="box-right">
                          <div className="top-img">
                            <img
                              src={collection.image}
                              alt=""
                            />
                            <img
                              src={collection.cover}
                              alt=""
                            />
                          </div>
                          <div className="bottom-img">
                            <img
                              src={collection.image}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            }
          </div>

          {
            visible < collections?.length
            && (
            <div className="col-md-12 wrap-inner load-more text-center">
              <button
                type="button"
                id="load-more"
                className="sc-button loadmore fl-button pri-3"
                onClick={showMoreItems}
              >
                <span>Load More</span>
              </button>
            </div>
            )
          }
        </>
      </TabPanel>
      <TabPanel index={2}>
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
      </TabPanel>
      <TabPanel index={3}>
        <DropsRaw />
      </TabPanel>
    </Tabs>
  );
}

export default BrowserPageContent;
