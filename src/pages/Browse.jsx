import React from 'react';
import BrowserPageContent from '../components/layouts/Browse/BrowserPageContent';
import Footer from '../components/footer/Footer';

function Browse() {
  return (
    <>
      <h2 className="mb-4 margin-Left-Right-Top ourArtists">
        Browse
      </h2>
      <BrowserPageContent />
      <Footer />
    </>
  );
}

export default Browse;
