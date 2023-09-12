import React , { useState } from 'react';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import LearnHeader from '../components/layouts/LearnPage/LearnHeader'
import LearnResourcesLoader from "../components/layouts/LearnPage/LearnResourceLoader";

const Learn = () => {
    return (
        <div>
            <HeaderStyle2 />
            <LearnHeader/>
            <LearnResourcesLoader/>
            <Footer />
        </div>
    );
}

export default Learn;
