import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { useSelector } from 'react-redux';
import CardModal from '../CardModal';
import DropsRaw from '../dropsRaw';
import DisplayArtworks from '../ProfileDisplay/DisplayArtworks';
import ArtistPageMediaViewer from '../artistPageMediaViewer/ArtistPageMediaViewer';

function BrowserPageContent() {
  const collections = useSelector((state) => state.usersReducer.collections);
  const lazyListed = useSelector((state) => state.usersReducer.lazyListed);
  const artistsState = useSelector((state) => state.usersReducer.artists);
  const [modalShow, setModalShow] = useState(false);

  const [dataTab] = useState(
    [
      {
        id: 1,
        title: 'Artworks',
      },
      {
        id: 2,
        title: 'Collections',
      },
      {
        id: 3,
        title: 'Artists',
      },
      {
        id: 4,
        title: 'Drops',
      },
    ],
  );
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
    <>
      <div className="flat-tabs items">
        <Tabs>
          <TabList style={{ margin: '0px 2% 0px 2%' }}>
            {
              dataTab.map((data) => (
                <Tab
                  style={{
                    marginRight: '20px',
                    marginLeft: '20px',
                  }}
                  key={data.id}
                >
                  {data.title}
                </Tab>
              ))
            }
          </TabList>
          <TabPanel key={1} style={{ padding: '95px 0px 0px 0px' }}>
            {lazyListed && <DisplayArtworks data={lazyListed} />}
          </TabPanel>
          <TabPanel key={2}>
            <div className="row">
              <div className="col-12">
                <div className="row tagsBar">
                  <div className="col-12">
                    <div
                      className="tag"
                      id="collection_painter"
                    >
                      Painter
                    </div>
                    <div
                      className="tag"
                      id="collection_photographer"
                    >
                      Photographer
                    </div>
                    <div
                      className="tag"
                      id="collection_sculpturer"
                    >
                      Sculpturer
                    </div>
                    <div
                      className="tag"
                      id="collection_ceramic_artist"
                    >
                      Ceramic artist
                    </div>
                    <div
                      className="tag"
                      id="collection_others"
                    >
                      Others
                    </div>
                  </div>
                </div>
              </div>
              {
                collections?.slice(0, visible)
                  .map((collection) => (
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
                                <Link to={`/displayProfile?${collection?.owner_profile_type}=${collection?.owner}`}>
                                  <span className="authorName">{collection?.owner_name}</span>
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
            </div>
          </TabPanel>
          <TabPanel key={3}>
            <section className="tf-section our-creater dark-style2">
              <div
                className="themesflat-container"
                style={{
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  marginLeft: '0px',
                  marginRight: '0px',
                  width: '100%',
                }}
              >
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="tf-title style4 mg-bt-38 ourArtists">
                      Artists
                    </h2>
                  </div>
                  <div className="col-md-12 col-sm-12 mobileTags">
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
                  <div className="col-12">
                    <div className="row tagsBar">
                      <div className="col-12">
                        <button
                          type="button"
                          className="tag"
                          onClick={(e) => editTags(e.target.id, e.target)}
                          onKeyDown={(e) => editTags(e.target.id, e.target)}
                          id="sculpturer"
                        >
                          Sculptors
                        </button>
                        <button
                          type="button"
                          className="tag"
                          onClick={(e) => editTags(e.target.id, e.target)}
                          onKeyDown={(e) => editTags(e.target.id, e.target)}
                          id="painter"
                        >
                          Painters
                        </button>
                        <button
                          type="button"
                          className="tag"
                          onClick={(e) => editTags(e.target.id, e.target)}
                          onKeyDown={(e) => editTags(e.target.id, e.target)}
                          id="photographer"
                        >
                          Photographers
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
                  </div>

                  {
                    artistsState?.map((item) => (
                      <div key={item?.userId} className="col-lg-4 col-md-6 col-12">
                        <Link to={`/displayProfile?artist=${item?.userId}`}>
                          <div className="sc-card-collection style-2">
                            <div className="card-bottom">
                              <div className="author">
                                <div className="sc-author-box style-2">
                                  <div className="author-avatar">
                                    <img src={item?.pdpLink} alt="" className="avatar" />
                                    <div className="badge" />
                                  </div>
                                </div>
                                <div className="content">
                                  <h4>{item?.name}</h4>
                                  <h5 className="artistCategory">{item?.artistType}</h5>
                                </div>
                              </div>
                              <div className="sc-button fl-button pri-3"><span>Follow</span></div>
                            </div>
                            <ArtistPageMediaViewer artworksArray={item?.artworkThumbNails} />
                          </div>
                        </Link>
                      </div>
                    ))
                  }
                </div>
              </div>
            </section>
          </TabPanel>
          <TabPanel key={4}>
            <DropsRaw />
          </TabPanel>
        </Tabs>
      </div>
      <CardModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

    </>
  );
}

export default BrowserPageContent;
