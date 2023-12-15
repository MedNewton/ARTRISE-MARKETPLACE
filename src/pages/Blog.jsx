import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import blogData from  '../assets/fake-data/data-blog'
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import db from "../firebase"
import {ref, onValue, get} from "firebase/database";
import img1 from '../assets/images/blog/thumb-1.jpg';
import imga1 from '../assets/images/avatar/avt-2.jpg'

const Blog = () => {
    const [data, setData] = useState({});

    const [visible , setVisible] = useState(6);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 3);
    }
    
    useEffect( async () => {
        const blogsRef = ref(db, 'blogs/')
        var dt;
        
        await get(blogsRef).then((snapshot) => {
            if(snapshot.exists)
            {
                dt = snapshot.val();
            }else{
                console.error("No data available");
            }
        }).then(function(){
            setData(dt);
        })
    }, [])
    
    return (
        <div>
            <HeaderStyle2 />
            
            <div className="tf-section sc-card-blog dark-style2">
                <div className="themesflat-container">
                    <div className="row mrgTopSection">
                    <div className="col-md-12">
                            <h2 className="tf-title style2 fs-50 mg-bt-38 ourArtists">
                            Blog
                                </h2>
                        </div>
                        <div className="fl-blog fl-item2 col-lg-4 col-md-6">
        <article className="sc-card-article">
            <div className="card-media">
                <Link to="/blog-details/Hybrid-NFTs"><img src={"https://miro.medium.com/max/1400/1*4NDULE6Ww72yr60pZRXFOw.png"}/></Link>
            </div>
            <div className="meta-info">
                <div className="author">
                    <div className="avatar">
                        <img src={imga1}/>
                    </div>
                    <div className="info">
                        <span>Post owner</span>
                        
                        <h6> <Link to="/">{"MEHDI LOUIJAB"}</Link> </h6>
                    </div>
                </div>
                <div className="date">{"11.01.2023"}</div>
            </div>
            <div className="text-article">
                <h3><Link to="/blog-details/Hybrid-NFTs">{"What is \"Hybrid NFT\""}</Link></h3>
                <p>{"An NFT, or non-fungible token, is a digital asset that represents ownership of a unique item or piece of content. "}</p>
            </div>
            <Link to="/blog-details/Hybrid-NFTs" className="sc-button fl-button pri-3"><span>Read More</span></Link>
        </article>
    </div>
                        {
                            
                            Object.keys(data).map((id, index) => {
                                return(
                                    <BlogItem key={index} item={data[id]} />
                                )
                            })
                        }
                        {
                            visible < data.length && 
                            <div className="col-md-12 wrap-inner load-more text-center"> 
                                <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3 mt-6" onClick={showMoreItems}><span>Load More</span></Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

const BlogItem = props => (
    <div className="fl-blog fl-item2 col-lg-4 col-md-6">
        <article className="sc-card-article">
            <div className="card-media">
                <Link to="/blog-details"><img src={img1}/></Link>
            </div>
            <div className="meta-info">
                <div className="author">
                    <div className="avatar">
                        <img src={imga1}/>
                    </div>
                    <div className="info">
                        <span>Post owner</span>
                        
                        <h6> <Link to="/author-02">{props.item.author}</Link> </h6>
                    </div>
                </div>
                <div className="date">{props.item.date}</div>
            </div>
            <div className="text-article">
                <h3><Link to="/blog-details">{props.item.title}</Link></h3>
                <p>{props.item.abv}</p>
            </div>
            <Link to="/blog-details" className="sc-button fl-button pri-3"><span>Read More</span></Link>
        </article>
    </div>
)



export default Blog;
