import React from 'react';
import BrowserPageContent from '../components/layouts/Browse/BrowserPageContent';
import Footer from '../components/footer/Footer';

function Browse() {
  return (
    <>
      <div
        className="margin-Left-Right-Top"
      >
        <h2 className=" ourArtists">
          Browse
        </h2>
        <BrowserPageContent />
      </div>
      <Footer />
    </>
  );
}

export default Browse;
