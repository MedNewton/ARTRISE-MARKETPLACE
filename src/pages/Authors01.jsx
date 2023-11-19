import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import popularCollectionData from '../assets/fake-data/data-popular-collection';
import {get, ref} from "firebase/database";
import db from "../firebase";
import {useDispatch, useSelector} from "react-redux";
import {SET_USERS, setUsers} from "../redux/actions/userActions";

// import { useArtworkContext } from '../Store/ArtworkContext';

const Authors01 = () => {
    let users = [];
    let artists = [];
    const dispatch = useDispatch();
    const  artistsState= useSelector((state) => state.usersReducer.artists);
    async function fetchUsers() {
        const userRef = ref(db, 'users/');
        await get(userRef).then(async (snapshot) => {
            let dt = snapshot.val();
            // console.log("redux dt:",dt)
            for (let UserKey in dt) {
                let a = dt[UserKey];
                if(a?.socialMediaVerified){
                    let userItem = {
                        userId: UserKey,
                        name: a?.name,
                        email: a?.email,
                        walletAddress: a?.walletAddress,
                        bio: a?.bio,
                        pdpLink: a?.pdpLink,
                        cover_link: a?.cover_link,
                        Facebook: a?.Facebook,
                        Instagram: a?.Instagram,
                        Twitter:a?.Twitter,
                        website: a?.website,
                        profileType: a?.profileType,
                        artistType:a?.artistType,
                        followedCollections: a?.followedCollections,
                        followers:a?.followers,
                        following:a?.following,
                        slug: a?.slug,
                        referralCode: a?.referralCode,
                        referralBy: a?.referralBy,
                        socialMediaVerified: a?.socialMediaVerified,
                        artRiseAdminVerified: a?.artRiseAdminVerified,
                        artworks: a?.artworks
                    }
                    users.push(userItem);
                }else if (!a?.verified){
                    let userItem = {
                        userId: UserKey,
                        name: a?.name,
                        email: a?.email,
                        walletAddress: a?.walletAddress,
                        bio: a?.bio,
                        pdpLink: a?.pdpLink,
                        cover_link: a?.cover_link,
                        Facebook: a?.Facebook,
                        Instagram: a?.Instagram,
                        Twitter:a?.Twitter,
                        website: a?.website,
                        profileType: a?.profileType,
                        artistType:a?.artistType,
                        followedCollections: a?.followedCollections,
                        followers:a?.followers,
                        following:a?.following,
                        slug: a?.slug,
                        referralCode: a?.referralCode,
                        referralBy: a?.referralBy,
                        socialMediaVerified: a?.socialMediaVerified,
                        artRiseAdminVerified: a?.artRiseAdminVerified,
                        artworks: a?.artworks
                    }
                    artists.push(userItem);
                }

            }

        })
        dispatch(setUsers({users, artists}));
    }

    useEffect(() => {
        fetchUsers();
    }, []);


    // const [data] = useState(popularCollectionData);
    // const { userArtist } = useArtworkContext();
    // const [visible , setVisible] = useState(20);
    // const showMoreItems = () => {
    //     setVisible((prevValue) => prevValue + 3);
    // }
    const selectedTags = [];
    function editTags(val, target){
        if(selectedTags.includes(val)){
            selectedTags.pop(val);
            target.classList.remove('selectedTag');
            target.classList.add('tag');
        }else{
            selectedTags.push(val);
            target.classList.remove('tag');
            target.classList.add('selectedTag');
        }
    }

    return (
        <div className='authors'>
            <HeaderStyle2 />
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
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="sculpturer">
                                        Sculptors
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="painter">
                                        Painters
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="photographer">
                                        Photographers
                                    </div>
                                    
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="others">
                                        Others
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            // artistsState?.length > 0 ? (
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
                                                {/*<div className="media-images-collection">*/}
                                                {/*    <div className="box-left">*/}
                                                {/*        <img src={item?.artworks[0]?.img} alt=""/>*/}
                                                {/*    </div>*/}
                                                {/*    <div className="box-right">*/}
                                                {/*        <div className="top-img">*/}
                                                {/*            <img*/}
                                                {/*                src={item?.artworks[1]?.img ? item?.artworks[1]?.img : item?.artworks[0]?.img}*/}
                                                {/*                alt=""/>*/}
                                                {/*            <img*/}
                                                {/*                src={item?.artworks[2]?.img ? item?.artworks[2]?.img : item?.artworks[0]?.img}*/}
                                                {/*                alt=""/>*/}
                                                {/*        </div>*/}
                                                {/*        <div className="bottom-img">*/}
                                                {/*            <img*/}
                                                {/*                src={item?.artworks[3]?.img ? item?.artworks[3]?.img : item?.artworks[0]?.img}*/}
                                                {/*                alt=""/>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                            </div>
                                        </Link>
                                    </div>
                                // )
                                ))
                            // :
                            // (
                            //     <>I am empty</>
                            // )
                        }




                    {/*    {*/}
                    {/*    visible < data.length &&*/}
                    {/*    <div className="col-md-12 wrap-inner load-more text-center">*/}
                    {/*        <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>*/}
                    {/*    </div>*/}
                    {/*}*/}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Authors01;
