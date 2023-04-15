import React , { useState} from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel  } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import CardModal from '../components/layouts/CardModal';

import avt from '../assets/images/avatar/avt-author-tab.jpg'
import img1 from '../assets/images/box-item/card-item-3.jpg'
import imga1 from '../assets/images/avatar/avt-1.jpg'
import imgCollection1 from '../assets/images/avatar/avt-18.jpg'
import img2 from '../assets/images/box-item/card-item-4.jpg'
import imga2 from '../assets/images/avatar/avt-2.jpg'
import imgCollection2 from '../assets/images/avatar/avt-18.jpg'
import img3 from '../assets/images/box-item/card-item-2.jpg'
import imga3 from '../assets/images/avatar/avt-4.jpg'
import imgCollection3 from '../assets/images/avatar/avt-18.jpg'
import img4 from '../assets/images/box-item/card-item-7.jpg'
import imga4 from '../assets/images/avatar/avt-3.jpg'
import imgCollection4 from '../assets/images/avatar/avt-18.jpg'
import img5 from '../assets/images/box-item/card-item8.jpg'
import imga5 from '../assets/images/avatar/avt-12.jpg'
import imgCollection5 from '../assets/images/avatar/avt-18.jpg'
import img6 from '../assets/images/box-item/card-item-9.jpg'
import imga6 from '../assets/images/avatar/avt-1.jpg'
import imgCollection6 from '../assets/images/avatar/avt-18.jpg'
import img7 from '../assets/images/box-item/image-box-6.jpg'
import imga7 from '../assets/images/avatar/avt-4.jpg'
import imgCollection7 from '../assets/images/avatar/avt-18.jpg'
import img8 from '../assets/images/box-item/image-box-11.jpg'
import imga8 from '../assets/images/avatar/avt-3.jpg'
import imgCollection8 from '../assets/images/avatar/avt-18.jpg'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import yann from '../assets/images/avatar/yann.jpg'
import SideBar from '../components/layouts/home-8/SideBar';
import { useAddress, useContract, useListings } from "@thirdweb-dev/react";
import popularCollectionData from '../assets/fake-data/data-popular-collection';
import Artworks from '../components/layouts/artworks';
import ArtworksRaw from '../components/layouts/artworksRaw';
import todayPickData from '../assets/fake-data/data-today-pick';
import DropsRaw from '../components/layouts/dropsRaw';
import ReadMoreReact from 'read-more-react';
import { useEffect } from 'react';
import db from '../firebase';
import {ref, onValue, get, update, set, child, remove, push} from "firebase/database";

function importAll(r) {
    return r.keys().map(r);
  }

const allArtworksImages = importAll(require.context('../assets/images/carre', false, /\.(JPG|png|jpe?g|svg)$/));
const paintingsImages = importAll(require.context('../assets/images/artworks/paintings', false, /\.(JPG|png|jpe?g|svg)$/));
const mosaicImages = importAll(require.context('../assets/images/artworks/mosaic', false, /\.(JPG|png|jpe?g|svg)$/));
const statuesImages = importAll(require.context('../assets/images/artworks/statues', false, /\.(JPG|png|jpe?g|svg)$/));

let allArtworks = [];
let paintings = [];
let statues = [];
let mosaics = [];

allArtworksImages.forEach(element=>{
    let artworkImage = element;
    let artworkName = "OPUS MAGNA";
    let authorImg = imga1;
    let authorName = "Yann Faisant";
    let artworkPrice = "4.89 ETH";
    let artworkPriceChange = "$12.246";
    let artworkWhitelist = "100";
    let artworkCollectionImage = imgCollection1;
    let artworkCollectionName = "Carré";
    
    let artwork = {
        img: artworkImage,
        title: artworkName,
        tags: "bsc",
        imgAuthor: imga1,
        nameAuthor: "Yann Faisant",
        price: "4.89 ETH",
        priceChange: "$12.246",
        wishlist: "100",
        imgCollection: imgCollection1,
        nameCollection: "Carré"
    }

    allArtworks.push(artwork);
})




const YannFaisantProfile = () => {

    const [openPanel, setOpenPanel] = useState(false);

    const {contract} = useContract("0x3ad7E785612f7bcA47e0d974d08f394d78B4b955", "marketplace");
    const { data: listings, isLoading, error } = useListings(contract);

    const [menuTab] = useState(
        [
            {
                class: 'active',
                name: 'Artworks'
            },
            {
                class: '',
                name: 'Collections'
            },
            {
                class: '',
                name: 'Drops'
            },
        ]
    )
    const [panelTab] = useState(
        [
            {
                id: 1,
                dataContent: allArtworks
            },
            {
                id: 2,
                dataContent: paintings
            },
            {
                id: 3,
                dataContent: mosaics
            },
            {
                id: 4,
                dataContent: statues
            },
        ]
    )

    const [collectionsData] = useState(popularCollectionData);

    const [visible , setVisible] = useState(8);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 4);
    }

    const [modalShow, setModalShow] = useState(false);

    const selectedCollectionTags = [];

    function editTags(val, target){
        if(selectedCollectionTags.includes(val)){
            selectedCollectionTags.pop(val);
            target.classList.remove('selectedTag');
            target.classList.add('tag');
        }else{
            selectedCollectionTags.push(val);
            target.classList.remove('tag');
            target.classList.add('selectedTag');
        }
    }

    const selectedArtistTags = [];

    function editArtistTags(val, target){
        if(selectedArtistTags.includes(val)){
            selectedArtistTags.pop(val);
            target.classList.remove('selectedTag');
            target.classList.add('tag');
        }else{
            selectedArtistTags.push(val);
            target.classList.remove('tag');
            target.classList.add('selectedTag');
        }
    
    }

    const address = useAddress();

    const [followed, setFollowed] = useState(false);
    const [followedText, setFollowedText] = useState("Follow");
    const [followedColor, setFollowedColor] = useState("#FFF");
    const [followedBG, setFollowedBG] = useState("transparent");

    async function getUserFollowings(){
        const ThisUserRef = ref(db, 'users/'+address); 
        await get(ThisUserRef).then(async (snapshot) => {

            let dt = snapshot.val();
            let followings = dt.followedArtists;


            for(let f in followings){

                if(followings[f].toString() == "Yann_Faisant"){
                    localStorage.setItem('thisFollowingID', f)
                    setFollowed(true);
                    setFollowedText("Unfollow");
                }
            }
        })
    }


    useEffect(() => {
        getUserFollowings();
    }, [])

    async function followUnfollow(e){
        if(followedText == "Follow") {
            const ThisUserFollowedArtistsRef = ref(db, 'users/'+address+'/followedArtists/');
            let newFollowingKey = await push(ThisUserFollowedArtistsRef, 'Yann_Faisant');
            //await set(ref(db, ThisUserFollowedArtistsRef+'/'+newFollowingKey+'/'), 'Yann_Faisant')
            setFollowed(true);
            setFollowedText("Unfollow");
        }else if(followedText == "Unfollow"){
            const ThisUserFollowedArtistsRef = ref(db, 'users/'+address+'/followedArtists/'+localStorage.getItem('thisFollowingID').toString()); 
            await remove(ThisUserFollowedArtistsRef).then(() => {
                setFollowed(false);
                setFollowedText("Follow")
            });
        }
    }
    
    
    
    

    return (
        <div className='authors-2'>
            <HeaderStyle2 />
            <section className="tf-section authors">
                <div className="themesflat-container">
                    <div className="flat-tabs tab-authors artistProfile">
                        <div className="author-profile flex">
                            <div className="feature-profile">
                                <img src={yann} alt="" className="avatar" />
                            </div>
                            <div className="infor-profile">
                                <span>Artist Profile</span>
                                <h2 className="title">Yann Faisant</h2>
                                
                                <div className='content desktopArtistDescription'>
                                <ReadMoreReact className="desktopArtistDescription" text={"Yann Faisant was born in 1960 in Paris. He lives and works in Tangier, In 1978, he began training as a horticulturist at the Igny Horticultural School, southwest of Paris, from which he graduated in 1980. Yann discovered a passion for dendrology, the science of trees, and notably for Ginkgo biloba, the essence, and properties of which have appeared intermittently throughout his work.  He subsequently started training in the visual arts, notably video and digital art, from 1985 to 1990. Parallel to this, he trained as a bronze smith, moving in and out of artists’ studios and foundries. Since 1992, Yann Faisant has experimented with different creative media (video, installations, and sculpture) to stress the close links and tensions between humankind and Nature. Art, as far as he is concerned, no longer stands for representation alone, but for a presentation of the reconciliation necessary between people and the natural elements crucial to their existence."}
                                    min={80}
                                    ideal={100}
                                    max={200}
                                    readMoreText={"Read more..."}/>
                                </div>
                                
                                
                                <form>
                                    <input type="text" className="inputcopy" defaultValue="0x3217FEAa676E12eBA46135C0C707fFbA6203c74C" readOnly />
                                    <button type="button" className="btn-copycode"><i className="icon-fl-file-1"></i></button>
                                </form>
                            </div>
                            
                            <div className="widget-social style-3">
                                <ul>
                                    <li className="style-2"><Link to="#"><i className="fab fa-telegram-plane"></i></Link></li>
                                    <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
                                    <li><Link to="//mobile.twitter.com/yannfaisant_"><i className="fab fa-twitter"></i></Link></li>
                                    <li className="mgr-none"><Link to="//www.facebook.com/YFaisant/"><i className="fab fa-facebook"></i></Link></li>
                                </ul>
                                <div className="btn-profile"><Link to="/login" className="sc-button style-1 follow" id='followBtn' onClick={(e)=>{e.preventDefault();followUnfollow(e)}}>{followedText}</Link></div>
                            </div>
                        </div>
                        <div className='content mobileArtistDescription'>
                            <ReadMoreReact className="mobileArtistDescription" text={"Yann Faisant was born in 1960 in Paris. He lives and works in Tangier, In 1978, he began training as a horticulturist at the Igny Horticultural School, southwest of Paris, from which he graduated in 1980. Yann discovered a passion for dendrology, the science of trees, and notably for Ginkgo biloba, the essence, and properties of which have appeared intermittently throughout his work.  He subsequently started training in the visual arts, notably video and digital art, from 1985 to 1990. Parallel to this, he trained as a bronze smith, moving in and out of artists’ studios and foundries. Since 1992, Yann Faisant has experimented with different creative media (video, installations, and sculpture) to stress the close links and tensions between humankind and Nature. Art, as far as he is concerned, no longer stands for representation alone, but for a presentation of the reconciliation necessary between people and the natural elements crucial to their existence."}
                                    min={80}
                                    ideal={100}
                                    max={200}
                                    readMoreText={"Read more..."}/>
                            </div>
                        <Tabs>
                            <TabList>
                                {
                                    menuTab.map((item,index) => (
                                        <Tab key={index}>{item.name}</Tab>
                                    ))
                                }
                            </TabList>

                            <div className="content-tab">
                                <div className="content-inner">
                                    <div className="row">
                                        <TabPanel key={0}>
                                            <ArtworksRaw data={todayPickData} />
                                            
                                        </TabPanel>
                                        <TabPanel key={1}>
                                        <div className="row">
                        <div className="col-12">
                            <div className="row tagsBar">
                                <div className="col-12">
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="collection_painter">
                                        Painter
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="collection_photographer">
                                        Photographer
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="collection_sculpturer">
                                        Sculpturer
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="collection_ceramic_artist">
                                        Ceramic artist
                                    </div>
                                    <div className='tag' onClick={(e) => editTags(e.target.id, e.target)} id="collection_others">
                                        Others
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            collectionsData.slice(0,visible).map((item,index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-12">
                                    <div className="sc-card-collection style-2">
                                        <div className="card-bottom">
                                            <div className="author">
                                                <div className="sc-author-box style-2">
                                                    <div className="author-avatar">
                                                        <img src="http://marketplace.artrise.io/static/media/carre2.22139fe1474fade1785f.jpg" alt="" className='avatar' />
                                                    <div className="badge"></div>
                                                </div>
                                                </div>
                                                <div className="content">
                                                    <h4><Link to="/pixelizd-mosaic-collection">{"Pixelized Mosaic"}</Link></h4>
                                                    <p>By <Link to="/Artists/Yann_Faisant"><span className='authorName'>Yann Faisant</span></Link></p>
                                                </div>
                                            </div>
                                            <Link to="/login" className="sc-button fl-button pri-3"><span>Following</span></Link>
                                        </div>
                                        <Link to="/author-02">
                                            <div className="media-images-collection">
                                                <div className="box-left">
                                                    <img src="http://marketplace.artrise.io/static/media/carre4.ab991fdacaae0540bf90.jpg" alt="" />
                                                </div>
                                                <div className="box-right">
                                                    <div className="top-img">
                                                        <img src="http://marketplace.artrise.io/static/media/carre3.6147bdea570afcdc03a4.jpg" alt="" />
                                                        <img src="http://marketplace.artrise.io/static/media/carre1.d7ad1702258665b20fd6.jpg" alt="" />
                                                    </div>
                                                    <div className="bottom-img">
                                                        <img src="http://marketplace.artrise.io/static/media/Portret%20van%20Joan%20Jacob%20Mauricius.53f33d98075c90aec764.jpg" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                        {
                        visible < collectionsData.length && 
                        <div className="col-md-12 wrap-inner load-more text-center"> 
                            <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>
                        </div>
                    }
                        </div>
                                        </TabPanel>
                                        <TabPanel key={2}>
                                            <DropsRaw />
                                        </TabPanel>
                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </section>
            <CardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Footer />
        </div>
    );
}

export default YannFaisantProfile;
