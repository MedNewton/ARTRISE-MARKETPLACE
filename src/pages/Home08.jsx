import React from 'react';
import Header from '../components/header/HeaderStyle2';
import ItemContent from '../components/layouts/home-8/ItemContent';
import SideBar from '../components/layouts/home-8/SideBar';
import DisplayArtworks from "../components/layouts/ProfileDisplay/DisplayArtworks";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";

const Home08 = () => {
  return (
    <div>
        <HeaderStyle2 />
        <div style={{paddingTop:'10px'}}>
            <div>
                <h2 className="browse-page-title">Browse</h2>
            </div>
            <ItemContent/>
        </div>
        <Footer />
    </div>
  );
}

export default Home08;