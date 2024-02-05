import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../components/footer/Footer';

function Collections() {
  const collections = useSelector((state) => state.usersReducer.collections);
  const [visible, setVisible] = useState(6);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
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

  return (
    <>
      <div
        style={{
          paddingLeft: '2%',
          paddingRight: '2%',
          paddingTop:'60px',
          marginLeft: '0px',
          marginRight: '0px',
          width: '100%',
        }}
      >
        <div className="row">
          <div className="col-md-12">
            <h2 className=" ourArtists">
              Collections
            </h2>
          </div>
          <div className="col-12">
            <div className="row tagsBar">
              <div className="col-12">
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
          </div>

          {collections?.map((collection) => (
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
          ))}
          {visible < collections?.length && (
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
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Collections;
