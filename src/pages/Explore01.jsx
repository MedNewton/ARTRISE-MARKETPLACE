import React from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import TodayPicks from '../components/layouts/TodayPicks';
import todayPickData from '../assets/fake-data/data-today-pick';
import Artworks from '../components/layouts/artworks';

const Explore01 = () => {
    return (
        <div>
            <HeaderStyle2 />
            
            <Artworks data={todayPickData} />
            <Footer />
        </div>
    );
}


export default Explore01;
