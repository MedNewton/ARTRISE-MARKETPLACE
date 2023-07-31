import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import TopSeller from "../components/layouts/authors/TopSeller";
import topSellerData from "../assets/fake-data/data-top-seller";
import popularCollectionData from "../assets/fake-data/data-popular-collection";
import db from "../firebase";
import { get, ref } from "firebase/database";
const Collections = () => {
  const [collections, setCollections] = useState([]);

  async function getCollections() {
    let collectionID = window.location.href.toString().split("id=")[1];
    const collectionRef = ref(db, "collections/");
    await get(collectionRef).then(async (snapshot) => {
      let collections = snapshot.val();
      for (let i in collections) {
        let dt = collections[i];
        let ownerID = dt.owner;
        let ownerName = "";
        let ownerImage = "";
        const ownerRef = ref(db, "users/" + ownerID);
        await get(ownerRef).then((snap) => {
          let ownerDt = snap.val();
          ownerName = ownerDt.displayName;
          ownerImage = ownerDt.pdpLink;
        });
        let collection = {
          image: dt.image,
          cover: dt.cover,
          name: dt.name,
          description: dt.description,
          owner: dt.owner,
          createdAt: dt.createdAt,
          owner_name: ownerName,
          owner_image: ownerImage,
          id: i,
        };
        console.log(collection);
        setCollections((prevState) => [...prevState, collection]);
      }
    });
  }

  const [data] = useState(popularCollectionData);

  const [visible, setVisible] = useState(6);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  const selectedTags = [];

  useEffect(() => {
    getCollections();
  }, []);

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
  return (
    <div className="authors">
      <HeaderStyle2 />

      <section className="tf-section our-creater dark-style2">
        <div
          className="themesflat-container"
          style={{
            paddingLeft: "1%",
            paddingRight: "1%",
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
            {data.slice(0, visible).map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12">
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
                          <div className="badge"></div>
                        </div>
                      </div>
                      <div className="content">
                        <h4>
                          <Link to="/pixelizd-mosaic-collection">
                            {"Pixelized Mosaic"}
                          </Link>
                        </h4>
                        <p>
                          By{" "}
                          <Link to="/Artists/Yann_Faisant">
                            <span className="authorName">Yann Faisant</span>
                          </Link>
                        </p>
                      </div>
                    </div>
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
            ))}
            {collections.map((collection, index) => {
              return (
                <div key={index} className="col-lg-4 col-md-6 col-12">
                  <div className="sc-card-collection style-2">
                    <div className="card-bottom">
                      <div className="author">
                        <div className="sc-author-box style-2">
                          <div className="author-avatar">
                            <img
                              src={collection.image}
                              alt=""
                              className="avatar"
                            />
                            <div className="badge"></div>
                          </div>
                        </div>
                        <div className="content">
                          <h4>
                            <Link to="">
                              {collection.name}
                            </Link>
                          </h4>
                          <p>
                            By{" "}
                            <Link to="">
                              <span className="authorName">{collection.owner_name}</span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link to="/author-02">
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
            {visible < data.length && (
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
