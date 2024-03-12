import React from 'react';
import Footer from '../components/footer/Footer';
import todayPickData from '../assets/fake-data/data-today-pick';
import Artworks from '../components/layouts/artworks';

function Masterpieces() {
  return (
    <div>
      <Artworks data={todayPickData} />
      <Footer />
    </div>
  );
}

export default Masterpieces;
