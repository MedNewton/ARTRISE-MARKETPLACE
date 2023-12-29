import React from 'react';
import {Link} from 'react-router-dom';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import {useSelector} from "react-redux";
import cardItem1 from "../assets/images/box-item/card-item-1.jpg";
import ArtistPageMediaViewer from "../components/artistPageMediaViewer/ArtistPageMediaViewer";

const artistsDefaultImagesMappings = {
    cardItem1: cardItem1,
};

const Authors01 = () => {
    const artistsState = useSelector((state) => state.usersReducer.artists);
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
        <div className='authors'>
            <HeaderStyle2/>
            <section className="tf-section our-creater dark-style2">
                <div className="themesflat-container"
                     style={{
                         paddingLeft: "2%",
                         paddingRight: "2%",
                         marginLeft: "0px",
                         marginRight: "0px",
                         width: "100%"
                     }}
                >
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="tf-title style4 mg-bt-38 ourArtists">
                                Artists</h2>
                        </div>
                        <div className="col-md-12 col-sm-12 mobileTags">
                            <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="painter">
                                Painter
                            </div>
                            <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="photographer">
                                Photographer
                            </div>
                            <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="sculpturer">
                                Sculpturer
                            </div>
                            <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="ceramic_artist">
                                Ceramic artist
                            </div>
                            <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="others">
                                Others
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row tagsBar">
                                <div className="col-12">
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)}
                                         id="sculpturer">
                                        Sculptors
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="painter">
                                        Painters
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)}
                                         id="photographer">
                                        Photographers
                                    </div>

                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="others">
                                        Others
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            artistsState?.map((item, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-12">
                                    <Link to={"/displayProfile?artist=" + item?.userId}>
                                        <div className="sc-card-collection style-2">
                                            <div className="card-bottom">
                                                <div className="author">
                                                    <div className="sc-author-box style-2">
                                                        <div className="author-avatar">
                                                            <img src={item?.pdpLink} alt="" className='avatar'/>
                                                            <div className="badge"></div>
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        <h4>{item?.name}</h4>
                                                        <h5 className='artistCategory'>{item?.artistType}</h5>
                                                    </div>
                                                </div>
                                                <div className="sc-button fl-button pri-3"><span>Follow</span></div>
                                            </div>
                                            <ArtistPageMediaViewer artworksArray={item?.artworkThumbNails}/>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Authors01;
