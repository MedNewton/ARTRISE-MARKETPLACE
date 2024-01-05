import React from 'react';
import BrowserPageContent from '../components/layouts/Browse/BrowserPageContent';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';

function Browse() {
  return (
    <div>
      <HeaderStyle2 />
      <div style={{ paddingTop: '10px' }}>
        <div>
          <h2 className="browse-page-title">Browse</h2>
        </div>
        <BrowserPageContent />
      </div>
      <Footer />
    </div>
  );
}

export default Browse;
