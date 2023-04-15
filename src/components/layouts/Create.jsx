import React from 'react';
import { Link } from 'react-router-dom'
import icon1 from '../../assets/images/icon/integrate.png'
import icon2 from '../../assets/images/icon/Category.png'
import icon3 from '../../assets/images/icon/sell.png'
import icon4 from '../../assets/images/icon/ownership.png'
import icon5 from '../../assets/images/icon/expose.png'
import icon6 from '../../assets/images/icon/collaborate.png'

const Create = () => {
    const data = [
        {
            title: "Intergrate",
            description: "Tokenize your physcial artwork into phygital NFTs.",
            icon : icon1,
            colorbg : "icon-color1"
        },
        {
            title: "Claim Ownership",
            description: "Certify and protect your art collection through blockchain.",
            icon : icon4,
            colorbg : "icon-color2"
        },
        {
            title: "Collaborate",
            description: "Collaborate with other artists to create digitalized versions of their physical art.",
            icon : icon6,
            colorbg : "icon-color1"
        },
    
        {
            title: "List & Sell",
            description: "List your artwork for sale and run auctions.",
            icon : icon3,
            colorbg : "icon-color3"
        },
        {
            title: "Collect",
            description: "Explore, find and collect artworks that inspire you.",
            icon : icon2,
            colorbg : "icon-color2"
        },
        {
            title: "Expose",
            description: "Expose your art in both physical and digital galleries.",
            icon : icon5,
            colorbg : "icon-color3"
        },
        
        
    ]
    return (
        <section className="tf-box-icon create style1 tf-section">
            <div className="themesflat-container">
                <div className="row">
                        <div className="col-12">
                            <h1 className="tf-title-heading ct style-2 fs-30 mg-bt-10 SeparatorTitle2">
                            The link between physical Art an Blockchain
                            </h1>
                            <h4 className="sub-title help-center mg-bt-32 lastSeparatingText">
                            We are playing a big part in the revolution of art by creating limitless possibilities for all the industry actors.
                            </h4>
                        </div>
                </div>  
                <div className="row">
                        {
                            data.map((item , index) => (
                                <CreateItem key={index} item={item} />
                            ))
                        }
                </div>                 
            </div>
        </section>
    );
}

const CreateItem = props => (
    <div className='col-lg-4 col-md-6 col-sm-6 col-6 createSectionItems'>
        <div className="sc-box-icon">
            <div className="image">
                <div className={`icon-create ${props.item.colorbg}`}>
                    <img src={props.item.icon} alt="" />
                </div>                                                                             
            </div>
            <h3 className="heading"><Link to="/wallet-connect">{props.item.title}</Link></h3>
            <p className="content">{props.item.description}</p>
        </div>
    </div>
)

export default Create;
