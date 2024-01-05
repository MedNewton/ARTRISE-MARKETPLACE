import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import CardModal from '../CardModal';
import DropsRaw from '../dropsRaw';
import DisplayArtworks from '../ProfileDisplay/DisplayArtworks';

function BrowserPageContent() {
  const collections = useSelector((state) => state.usersReducer.collections);
  const lazyListed = useSelector((state) => state.usersReducer.lazyListed);
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
        id: 3,
        title: 'Drops',
      },
    ],
  );
  const [visible, setVisible] = useState(15);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 5);
  };

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

  function generateUniqueId() {
    return uuidv4();
  }

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
          <TabPanel key={0} style={{ padding: '95px 0px 0px 0px' }}>
            {lazyListed && <DisplayArtworks data={lazyListed} />}
          </TabPanel>
          <TabPanel key={1}>
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
                  .map((item) => (
                    <div key={item?.id ? item?.id : generateUniqueId()} className="col-lg-4 col-md-6 col-12">
                      <div className="sc-card-collection style-2">
                        <div className="card-bottom">
                          <div className="author">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <img
                                  src="http://marketplace.artrise.io/static/media/carre2.22139fe1474fade1785f.jpg"
                                  alt=""
                                  className="avatar"
                                />
                                <div className="badge" />
                              </div>
                            </div>
                            <div className="content">
                              <h4><Link to="/pixelizd-mosaic-collection">Pixelized Mosaic</Link></h4>
                              <p>
                                By
                                <Link to="/"><span className="authorName">Yann Faisant</span></Link>
                              </p>
                            </div>
                          </div>
                          <Link to="/" className="sc-button fl-button pri-3"><span>Following</span></Link>
                        </div>
                        <Link to="/author-02">
                          <div className="media-images-collection">
                            <div className="box-left">
                              <img
                                src="http://marketplace.artrise.io/static/media/carre4.ab991fdacaae0540bf90.jpg"
                                alt=""
                              />
                            </div>
                            <div className="box-right">
                              <div className="top-img">
                                <img
                                  src="http://marketplace.artrise.io/static/media/carre3.6147bdea570afcdc03a4.jpg"
                                  alt=""
                                />
                                <img
                                  src="http://marketplace.artrise.io/static/media/carre1.d7ad1702258665b20fd6.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="bottom-img">
                                <img
                                  src="http://marketplace.artrise.io/static/media/Portret%20van%20Joan%20Jacob%20Mauricius.53f33d98075c90aec764.jpg"
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
          <TabPanel key={2}>
            <div className="row">
              <div className="col-12">
                <div className="row tagsBar">
                  <div className="col-12">
                    <div
                      className="tag"
                      id="artists_painter"
                    >
                      Painter
                    </div>
                    <div
                      className="tag"
                      id="artists_photographer"
                    >
                      Photographer
                    </div>
                    <div
                      className="tag"
                      id="artists_sculpturer"
                    >
                      Sculpturer
                    </div>
                    <div
                      className="tag"
                      id="artists_ceramic_artist"
                    >
                      Ceramic artist
                    </div>
                    <div
                      className="tag"
                      id="artists_others"
                    >
                      Others
                    </div>
                  </div>
                </div>
              </div>

              {
                collections?.slice(0, visible)
                  .map((item) => (
                    <div key={item?.id ? item?.id : generateUniqueId()} className="col-lg-4 col-md-6 col-12">
                      <div className="sc-card-collection style-2">
                        <div className="card-bottom">
                          <div className="author">
                            <div className="sc-author-box style-2">
                              <div className="author-avatar">
                                <img src={item.imgAuthor} alt="" className="avatar" />
                                <div className="badge" />
                              </div>
                            </div>
                            <div className="content">
                              <h4><Link to="/">{item.name}</Link></h4>

                            </div>
                          </div>
                          <Link to="/" className="sc-button fl-button pri-3"><span>Following</span></Link>
                        </div>
                        <Link to="/author-02">
                          <div className="media-images-collection">
                            <div className="box-left">
                              <img
                                src="http://marketplace.artrise.io/static/media/carre2.22139fe1474fade1785f.jpg"
                                alt=""
                              />
                            </div>
                            <div className="box-right">
                              <div className="top-img">
                                <img
                                  src="http://marketplace.artrise.io/static/media/carre3.6147bdea570afcdc03a4.jpg"
                                  alt=""
                                />
                                <img
                                  src="http://marketplace.artrise.io/static/media/carre1.d7ad1702258665b20fd6.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="bottom-img">
                                <img
                                  src="http://marketplace.artrise.io/static/media/Portret%20van%20Joan%20Jacob%20Mauricius.53f33d98075c90aec764.jpg"
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
