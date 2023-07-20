import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, withRouter } from "react-router-dom";
import Header from "../components/header/Header";
import HeaderStyle2 from "../components/header/HeaderStyle2";
import Footer from "../components/footer/Footer";
import avt from "../assets/images/avatar/avata_profile.jpg";
import bg1 from "../assets/images/backgroup-secsion/option1_bg_profile.jpg";
import bg2 from "../assets/images/backgroup-secsion/option2_bg_profile.jpg";
import db from "../firebase";
import storage from "../storage";
import { ref, onValue, get, update, set, child } from "firebase/database";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import Table from "react-bootstrap/Table";

import {
  ref as SRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import ReferralModal from "../components/layouts/referralModal";

const ReferralHome = () => {
  const nav = useNavigate();

  const address = useAddress();
  const [createModalShow, setCreateModalShow] = useState(false);

  return (
    <div>
      <HeaderStyle2 />

      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row profilePadding">
            <div className="col-md-12" style={{ marginBottom: "3%" }}>
              <h2 className="tf-title style4 mg-bt-38 ourArtists">Referral</h2>
            </div>
            <div className="referralContainer">
              <div className="row referralBox">
                <div className="col-md-6 referralBoxImage">
                  <div className="referralImage"></div>
                </div>
                <div className="col-md-6 referralBoxText">
                  <h5 className="referralBoxTitle">
                    ARTRISE is a growing community !
                  </h5>
                  <h5 className="referralBoxLabel">
                    Send your referral link to your fiends and invite them to
                    join ARTRISE. on every refered memeber, you get amazing
                    rewards!
                  </h5>
                  <button
                    className="tf-button-submit mg-t-15"
                    id="submitBtn"
                    type="button"
                    onClick={() => {
                      setCreateModalShow(true);
                    }}
                  >
                    Refer a friend
                  </button>
                </div>
              </div>
            </div>
            <div className="referralInbfoBox">
              <Table striped bordered hover responsive style={{
                borderRadius: "15px"
              }}>
                <thead>
                  <tr>
                    <th>Referred</th>
                    <th>By</th>
                    <th>Referrer reward</th>
                    <th>Function</th>
                    <th>Referred reward</th>
                    <th>Process</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Artist</td>
                    <td>Artist / User / Collector</td>
                    <td>1 artwork integration = 1 free mint + 1% of artist's sale</td>
                    <td>Up to 10 & up to 3 months</td>
                    <td>10 free mints  + 10 tickets</td>
                    <td>from 15% to 16% for the artist</td>
                  </tr>
                  <tr>
                    <td>Artist</td>
                    <td>Artist / User / Collector</td>
                    <td>1 artwork integration = 1 free mint + 3% of artist's sale</td>
                    <td>Up to 50 & up to 3 months</td>
                    <td>10 free mints  + 10 tickets</td>
                    <td>from 15% to 17% for the artist</td>
                  </tr>
                  <tr>
                    <td>Artist</td>
                    <td>Artist / User / Collector</td>
                    <td>1 artwork integration = 1 free mint + 5% of artist's sale</td>
                    <td>Over 50% & up to 3 months</td>
                    <td>10 free mints  + 10 tickets</td>
                    <td>from 15% to 18% for the artist</td>
                  </tr>
                  <tr>
                    <td>Artist</td>
                    <td>Communities</td>
                    <td>1 artwork integration = 5% of artist's sale</td>
                    <td>Up to 3 months</td>
                    <td>10 free mints  + 10 tickets</td>
                    <td>from 15% to 20% for the artist</td>
                  </tr>
                  <tr>
                    <td>User  / collector</td>
                    <td>Artist / User / Collector</td>
                    <td>Sale from referred = 5% of the platform fees on the sale</td>
                    <td>Up to 10</td>
                    <td>10 tickets</td>
                    <td>5% of the ARTRISE fees</td>
                  </tr>
                  <tr>
                    <td>User  / collector</td>
                    <td>Artist / User / Collector</td>
                    <td>Sale from referred = 7% of the platform fees on the sale</td>
                    <td>Up to 50</td>
                    <td>10 tickets</td>
                    <td>7% of the ARTRISE fees</td>
                  </tr>
                  <tr>
                    <td>User  / collector</td>
                    <td>Artist / User / Collector</td>
                    <td>Sale from referred = 10% of the platform fees on the sale</td>
                    <td>Over 100</td>
                    <td>10 tickets</td>
                    <td>10% of the ARTRISE fees</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <ReferralModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
      <Footer />
    </div>
  );
};

export default ReferralHome;
