import React , { useState , Fragment , useRef} from 'react'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel  } from 'react-tabs';
import CardModal from '../CardModal';
import {useContract, useListings } from "@thirdweb-dev/react";

import img1 from '../../../assets/images/box-item/image-box-47.jpg'
import imga1 from '../../../assets/images/avatar/author_rank.jpg'
import img2 from '../../../assets/images/box-item/image-box-48.jpg'
import imga2 from '../../../assets/images/avatar/avt-3.jpg'
import img3 from '../../../assets/images/box-item/image-box-34.jpg'
import imga3 from '../../../assets/images/avatar/avt-27.jpg'
import img4 from '../../../assets/images/box-item/image-box-35.jpg'
import imga4 from '../../../assets/images/avatar/avt-10.jpg'
import img5 from '../../../assets/images/box-item/image-box-36.jpg'
import imga5 from '../../../assets/images/avatar/avt-5.jpg'
import img6 from '../../../assets/images/box-item/image-box-32.jpg'
import img7 from '../../../assets/images/box-item/image-box-33.jpg'
import img8 from '../../../assets/images/box-item/image-box-52.jpg'
import img9 from '../../../assets/images/box-item/image-box-53.jpg'
import img10 from '../../../assets/images/box-item/image-box-49.jpg'
import img11 from '../../../assets/images/box-item/image-box-54.jpg'
import img12 from '../../../assets/images/box-item/image-box-55.jpg'
import img13 from '../../../assets/images/box-item/image-box-56.jpg'
import img14 from '../../../assets/images/box-item/image-box-50.jpg'
import img15 from '../../../assets/images/box-item/image-box-51.jpg'
import "react-sliding-pane/dist/react-sliding-pane.css";
import DropsRaw from '../dropsRaw';
import DisplayArtworks from "../ProfileDisplay/DisplayArtworks";
import {useSelector} from "react-redux";

const ItemContent = () => {
    const collections = useSelector((state) => state.usersReducer.collections);
    const lazyListed = useSelector((state) => state.usersReducer.lazyListed);

    const {contract} = useContract("0x3ad7E785612f7bcA47e0d974d08f394d78B4b955", "marketplace");
    const { data: listings, isLoading, error } = useListings(contract);

    const [dataTab] = useState(
        [
            {
                id: 1,
                title: "Artworks",
            },
            {
                id: 2,
                title: "Collections",
            },
            {
                id: 3,
                title: "Artists",
            },
            {
                id: 3,
                title: "Drops",
            },
        ]
    )
    const [visible , setVisible] = useState(15);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 5);
    }
    const listBtn = useRef(null)
    const gridBtn = useRef(null)
    const listContent = useRef(null)
    const gridContent = useRef(null)
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


    const [modalShow, setModalShow] = useState(false);
  return (
    
    <Fragment>
        <div className="flat-tabs items" >
            <Tabs  >
                <TabList  style={{margin:'0px 2% 0px 2%'}}>
                    {
                        dataTab.map(data=> (
                            <Tab style={{marginRight:'20px',marginLeft:'20px'}}   key={data.id} >{data.title}</Tab>
                        ))
                    }
                </TabList>
                <TabPanel key={0} style={{padding:'95px 0px 0px 0px'}}>
                    {lazyListed && <DisplayArtworks data={lazyListed}/>}
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
                            collections?.slice(0,visible).map((item,index) => (
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
                        visible < collections?.length &&
                        <div className="col-md-12 wrap-inner load-more text-center"> 
                            <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>
                        </div>
                    }
                        </div>
                        </TabPanel>
                        <TabPanel key={2}>
                        <div className="row">
                        <div className="col-12">
                            <div className="row tagsBar">
                                <div className="col-12">
                                    <div className='tag' onClick={(e) => editArtistTags(e.target.id, e.target)} id="artists_painter">
                                        Painter
                                    </div>
                                    <div className='tag' onClick={(e) => editArtistTags(e.target.id, e.target)} id="artists_photographer">
                                        Photographer
                                    </div>
                                    <div className='tag' onClick={(e) => editArtistTags(e.target.id, e.target)} id="artists_sculpturer">
                                        Sculpturer
                                    </div>
                                    <div className='tag' onClick={(e) => editArtistTags(e.target.id, e.target)} id="artists_ceramic_artist">
                                        Ceramic artist
                                    </div>
                                    <div className='tag' onClick={(e) => editArtistTags(e.target.id, e.target)} id="artists_others">
                                        Others
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            collections?.slice(0,visible).map((item,index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-12">
                                    <div className="sc-card-collection style-2">
                                        <div className="card-bottom">
                                            <div className="author">
                                                <div className="sc-author-box style-2">
                                                    <div className="author-avatar">
                                                        <img src={item.imgAuthor} alt="" className='avatar' />
                                                    <div className="badge"></div>
                                                </div>
                                                </div>
                                                <div className="content">
                                                    <h4><Link to="/Artists/Yann_Faisant">{item.name}</Link></h4>
                                                    
                                                </div>
                                            </div>
                                            <Link to="/login" className="sc-button fl-button pri-3"><span>Following</span></Link>
                                        </div>
                                        <Link to="/author-02">
                                            <div className="media-images-collection">
                                                <div className="box-left">
                                                    <img src="http://marketplace.artrise.io/static/media/carre2.22139fe1474fade1785f.jpg" alt="" />
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
                        visible < collections?.length &&
                        <div className="col-md-12 wrap-inner load-more text-center"> 
                            <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>
                        </div>
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
        
    </Fragment>
  )
}

export default ItemContent