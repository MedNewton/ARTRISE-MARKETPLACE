import React from 'react';
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
    <>
      <div className="margin-Left-Right-Top">
        <div className="row">
          <div className="col-md-12">
            <h2 className=" ourArtists">
              Drops
            </h2>
          </div>
          <div className="col-md-12 col-sm-12 mobileTags">
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="painter"
            >
              Painting
            </button>
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="photographer"
            >
              Photography
            </button>
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="sculpturer"
            >
              Sculpture
            </button>
            <button
              type="button"
              className="tag"
              onClick={(e) => editTags(e.target.id, e.target)}
              onKeyDown={(e) => editTags(e.target.id, e.target)}
              id="ceramic_artist"
            >
              Others...
            </button>
          </div>
          <div className="col-12">
            <div className="row tagsBar">
              <div className="col-12">
                <button
                  type="button"
                  className="tag"
                  onClick={(e) => editTags(e.target.id, e.target)}
                  onKeyDown={(e) => editTags(e.target.id, e.target)}
                  id="sculpturer"
                >
                  Painting
                </button>
                <button
                  type="button"
                  className="tag"
                  onClick={(e) => editTags(e.target.id, e.target)}
                  onKeyDown={(e) => editTags(e.target.id, e.target)}
                  id="painter"
                >
                  Photography
                </button>
                <button
                  type="button"
                  className="tag"
                  onClick={(e) => editTags(e.target.id, e.target)}
                  onKeyDown={(e) => editTags(e.target.id, e.target)}
                  id="photographer"
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
          <div className="col-md-12">
            <LiveAuction2 data={liveAuctionData2} />
          </div>
          <div className="col-md-12">
            <LiveAuction data={liveAuctionData} />
          </div>
          <div className="col-md-12">
            <ComingSoon data={ComingSoonData} />
          </div>
          <div />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Drops;
