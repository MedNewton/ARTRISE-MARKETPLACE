import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../components/header/Header";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import TopSeller from "../components/layouts/authors/TopSeller";
import topSellerData from "../assets/fake-data/data-top-seller";
import popularCollectionData from "../assets/fake-data/data-popular-collection";
import db from "../firebase";
import { get, ref } from "firebase/database";
import { useCollectionsContext } from "../Store/CollectionsContext";
import {useSelector} from "react-redux";



const Collections = () => {
  const collections = useSelector((state) => state.usersReducer.collections);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(6);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  const currentUserSlug = localStorage.getItem("Slug");
  const currentUserUserKey = localStorage.getItem("userId");

  const selectedTags = [];

  function editTags(val, target) {
    if (selectedTags.includes(val)) {
      selectedTags.pop(val);
      target.classList.remove("selectedTag");
      target.classList.add("tag");
    } else {
      selectedTags.push(val);
      target.classList.remove("tag");
      target.classList.add("selectedTag");
    }

    console.log(selectedTags);
  }

  const handleUserNameClick = (id) => {
        if(id === currentUserUserKey){
          navigate(`/profile?id=${currentUserSlug}`);
        }else{
          navigate(`/displayProfile?artist=${id}`)
        }
  };

  return (
    <div className="authors">
      <HeaderStyle2 />

      <section className="tf-section our-creater dark-style2">
        <div
          className="themesflat-container"
          style={{
            paddingLeft: "2%",
            paddingRight: "2%",
            marginLeft: "0px",
            marginRight: "0px",
            width: "100%",
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <h2 className="tf-title style4 mg-bt-38 ourArtists">
                Collections
              </h2>
            </div>
            <div className="col-12">
              <div className="row tagsBar">
                <div className="col-12">
                  <div
                    className="tag"
                    onClick={(e) => editTags(e.target.id, e.target)}
                    id="painter"
                  >
                    Painting
                  </div>
                  <div
                    className="tag"
                    onClick={(e) => editTags(e.target.id, e.target)}
                    id="photographer"
                  >
                    Photography
                  </div>
                  <div
                    className="tag"
                    onClick={(e) => editTags(e.target.id, e.target)}
                    id="sculpturer"
                  >
                    Sculpture
                  </div>
                  <div
                    className="tag"
                    onClick={(e) => editTags(e.target.id, e.target)}
                    id="ceramic_artist"
                  >
                    Mosaic
                  </div>
                  <div
                    className="tag"
                    onClick={(e) => editTags(e.target.id, e.target)}
                    id="others"
                  >
                    Others
                  </div>
                </div>
              </div>
            </div>

            {collections?.map((collection, index) => {
              return (
                <div key={index} className="col-lg-4 col-md-6 col-12">
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
                            <div className="badge"></div>
                          </div>
                        </div>
                        <div className="content">
                          <h4>
                            <Link to={`/collection?id=${collection?.id}`}>
                              {collection.name}
                            </Link>
                          </h4>
                          <p>
                            By{" "}
                              <span onClick={()=>handleUserNameClick(collection?.owner)} className="authorName">{collection.owner_name}</span>
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
              );
            })}
            {visible < collections?.length && (
              <div className="col-md-12 wrap-inner load-more text-center">
                <Link
                  to="#"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={showMoreItems}
                >
                  <span>Load More</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Collections;
