import React from 'react';
import HeaderStyle2 from '../components/header/HeaderStyle2';
import Footer from '../components/footer/Footer';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import liveAuctionData2 from '../assets/fake-data/data-live-auction-2';
import LiveAuction from '../components/layouts/LiveAuction';
import LiveAuction2 from '../components/layouts/LiveAuction2';
import ComingSoon from '../components/layouts/ComingSoon';
import ComingSoonData from '../assets/fake-data/comingSoonData';

function Drops() {
  const selectedTags = [];

  function editTags(val, target) {
    if (selectedTags.includes(val)) {
      selectedTags.pop(val);
      target.classList.remove('selectedTag');
      target.classList.add('tag');
    } else {
      selectedTags.push(val);
      target.classList.remove('tag');
      target.classList.add('selectedTag');
    }
  }

  return (
    <div>
      <HeaderStyle2 />
      <div className="drop-page-header-wrapper">
        <div>
          <h2>Drops</h2>
        </div>

        <div className="col-md-12 col-sm-12 mobileTags">
          <button
            type="button"
            className="tag"
            onClick={(e) => editTags(e.target.id, e.target)}
            onKeyDown={(e) => editTags(e.target.id, e.target)}
            id="painting"
          >

            Painting
          </button>
          <button
            type="button"
            className="tag"
            onClick={(e) => editTags(e.target.id, e.target)}
            onKeyDown={(e) => editTags(e.target.id, e.target)}
            id="photography"
          >

            Photography
          </button>
          <button
            type="button"
            className="tag"
            onClick={(e) => editTags(e.target.id, e.target)}
            onKeyDown={(e) => editTags(e.target.id, e.target)}
            id="sculpture"
          >

            Sculpture
          </button>
          <button
            type="button"
            className="tag"
            onClick={(e) => editTags(e.target.id, e.target)}
            onKeyDown={(e) => editTags(e.target.id, e.target)}
            id="others"
          >
            Others...
          </button>
        </div>
        <div>
          <div>
            <div>
              <button
                type="button"
                className="tag"
                onClick={(e) => editTags(e.target.id, e.target)}
                onKeyDown={(e) => editTags(e.target.id, e.target)}
                id="painting"
              >
                Painting
              </button>
              <button
                type="button"
                className="tag"
                onClick={(e) => editTags(e.target.id, e.target)}
                onKeyDown={(e) => editTags(e.target.id, e.target)}
                id="photography"
              >
                Photography
              </button>
              <button
                type="button"
                className="tag"
                onClick={(e) => editTags(e.target.id, e.target)}
                onKeyDown={(e) => editTags(e.target.id, e.target)}
                id="sculpture"
              >
                Sculpture
              </button>
              <button
                type="button"
                className="tag"
                onClick={(e) => editTags(e.target.id, e.target)}
                onKeyDown={(e) => editTags(e.target.id, e.target)}
                id="others"
              >
                Others...
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <LiveAuction2 data={liveAuctionData2} />
      </div>
      <div className="drop-page-sections-wrapper">
        <div>
          <div className="col-md-12">
            <LiveAuction data={liveAuctionData} />
          </div>
          <div className="col-md-12">
            <ComingSoon data={ComingSoonData} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Drops;
