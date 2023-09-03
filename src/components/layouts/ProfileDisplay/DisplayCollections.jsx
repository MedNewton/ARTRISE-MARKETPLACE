import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import CardModal from "../CardModal";
import {useNavigate } from "react-router-dom";


const DisplayCollections = (props) => {
    const data = props?.data;

    const navigate = useNavigate();

    const handleOnClick = (index, collection) =>{
        navigate(`/collection?id=${collection?.id}`)


    }

    return (
        <div className='artist-profile-wrapper display-collections-wrapper' >
            <div className='Collections-filter-wrapper'>
                <div
                    className="tag"
                >
                    Painting
                </div>
                <div
                    className="tag"
                >
                    Photography
                </div>
                <div
                    className="tag"
                >
                    Sculpture
                </div>
                <div
                    className="tag"
                >
                    Ceramic Artworks
                </div>
                <div
                    className="tag"
                >
                    Others...
                </div>
            </div>

            <div className='d-flex flex-wrap flex-row' style={{gap: '20px'}}>
                {data?.map((collection, index) => {
                    return (
                        <div key={index} style={{maxWidth: "400px"}} onClick={()=>{handleOnClick(index, collection)}} >
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
            </div>
        </div>
    );
};

DisplayCollections.propTypes = {
    data: PropTypes.array.isRequired,
};
export default DisplayCollections;
