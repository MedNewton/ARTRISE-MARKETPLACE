/*eslint-disable*/
import React from 'react';
import BrowserPageContent from '../components/layouts/Browse/BrowserPageContent';
import Footer from '../components/footer/Footer';

function Browse() {
    return (
        <>
            <div
                style={{
                    paddingLeft: '2%',
                    paddingRight: '2%',
                    paddingTop: '60px',
                    marginLeft: '0px',
                    marginRight: '0px',
                    width: '100%',
                }}
            >
                <h2  className=" ourArtists">
                    <>Browse</>
                </h2>
                <BrowserPageContent/>
            </div>
            <Footer/>
        </>
    );
}

export default Browse;
