import React from 'react';

function SettingsPage() {
  return (
    <div>
      <section className="wrap-accordion">
        <div className="container">
          <div className="mrgTopSection">
            <h2 className="tf-title style2 fs-30 mg-bt-60">
              Settings
            </h2>
            <div className="settingsBoxesContainer">
              <div className="settingsBox">
                <input type="checkbox" />
                <div className="settingsBoxData">
                  <h5 className="settingsBoxTitle">Buy now notifications</h5>
                  <h5 className="settingsBoxLabel">
                    Receive in-app notifications when new artworks are
                    listed for sale with a Buy now option.
                  </h5>
                </div>
              </div>
              <div className="settingsBox">
                <input type="checkbox" />
                <div className="settingsBoxData">
                  <h5 className="settingsBoxTitle">Live drops notifications</h5>
                  <h5 className="settingsBoxLabel">
                    Receive in-app notifications when a live drop is about to
                    start or is currently happening.
                  </h5>
                </div>
              </div>
              <div className="settingsBox">
                <input type="checkbox" />
                <div className="settingsBoxData">
                  <h5 className="settingsBoxTitle">Upcoming artworks notifications</h5>
                  <h5 className="settingsBoxLabel">
                    Receive in-app notifications when new artworks are
                    scheduled to be listed for sale in the near future.
                  </h5>
                </div>
              </div>
              <div className="settingsBox">
                <input type="checkbox" />
                <div className="settingsBoxData">
                  <h5 className="settingsBoxTitle">Auction notifications</h5>
                  <h5 className="settingsBoxLabel">
                    Receive in-app notifications when bids you placed ar
                    confirmed,when you have been outbid, and when an auction has ended.
                  </h5>
                </div>
              </div>
              <div className="settingsBox">
                <input type="checkbox" />
                <div className="settingsBoxData">
                  <h5 className="settingsBoxTitle">Email notifications</h5>
                  <h5 className="settingsBoxLabel">
                    Receive email notifications about new artwork releases,
                    marketplace news & updates, and personalized recommendations based on your interests and activities.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;
