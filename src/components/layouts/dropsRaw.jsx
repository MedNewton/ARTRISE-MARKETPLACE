import React from 'react';
import LiveAuction from './LiveAuction';
import LiveAuction2 from './LiveAuction2';
import liveAuctionData from '../../assets/fake-data/data-live-auction';
import liveAuctionData2 from '../../assets/fake-data/data-live-auction-2';

function DropsRaw() {
  return (
    <div className="dropsRawContainer">
      <LiveAuction data={liveAuctionData} />
      <div className="dropsSeparator" />
      <LiveAuction2 data={liveAuctionData2} />
    </div>
  );
}

export default DropsRaw;
