import React from 'react';
import BrowserPageContent from '../components/layouts/Browse/BrowserPageContent';
import Footer from '../components/footer/Footer';

function Browse() {
  return (
    <div>
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
