import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Footer from '../components/footer/Footer';
import ReferralModal from '../components/layouts/referralModal';

function ReferralProgram() {
  const [createModalShow, setCreateModalShow] = useState(false);

  return (
    <div>
      <div className="referral-home-wrapper">
        <div className="flex-column-gap20">
          <div>
            <h3>Referral</h3>
          </div>
          <div className="flex-row-align-center" style={{ width: '100%', gap: '5%' }}>
            <div style={{ width: '40%' }}>
              <div className="referralImage" />
            </div>
            <div className="flex-column-gap20" style={{ width: '60%' }}>
              <h4>
                Spread the Rise of Hybrid Art - Join Our Referral Program
              </h4>
              <h6>
                Share the joy of art and be rewarded! Our referral program allows
                you to invite artists and art enthusiasts to ArtRise, and in return,
                you&apos;ll both unlock exciting benefits. Embrace the power of art and
                connections by joining our referral program today.
              </h6>
              <button
                className="refer-friend-button"
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

        <div className="flex-column-gap20">
          <div>
            <h3>Referral rewards</h3>
          </div>
          <div>
            <h6>Empower Art, Earn Together</h6>
          </div>
          <div className="flex-row-align-center" style={{ width: '100%', gap: '5%' }}>
            <div style={{ width: '40%' }}>
              <div className="referralImage" />
            </div>
            <div className="flex-column-gap20" style={{ width: '60%' }}>
              <h4>
                Referring a Member
              </h4>
              <div className="d-flex align-items-center">
                <h6>Inviter reward:&emsp; </h6>
                <p>5% of member&apos;s purchase</p>
              </div>
              <div className="d-flex align-items-center">
                <h6>Inviter reward:&emsp; </h6>
                <p>5% refund of the first purchase</p>
              </div>
            </div>
          </div>

          <div className="flex-row-align-center" style={{ width: '100%', gap: '5%' }}>
            <div style={{ width: '40%' }}>
              <div className="referralImage" />
            </div>
            <div className="flex-column-gap20" style={{ width: '60%' }}>
              <h4>
                Referring an Artists
              </h4>
              <div className="d-flex align-items-center">
                <h6>Inviter reward:&emsp; </h6>
                <p>5% of the artist&apos;s sale</p>
              </div>
              <div className="d-flex align-items-center">
                <h6>Inviter reward:&emsp; </h6>
                <p>5% of the artist&apos;s sale</p>
              </div>
            </div>
          </div>
        </div>

        <div className="referralInbfoBox flex-column-gap20">
          <h3>Activity</h3>
          <Table
            striped
            bordered
            hover
            responsive
            style={{
              borderRadius: '15px',
            }}
          >
            <thead>
              <tr>
                <th>Referred</th>
                <th>Type</th>
                <th>Reward</th>
                <th>Collected</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BVRTS</td>
                <td>Artist</td>
                <td>1% of artist&apos;s sale</td>
                <td>40$</td>
                <td>23/05/23</td>
              </tr>
              <tr>
                <td>Luiji</td>
                <td>Member</td>
                <td>1% of artist&apos;s sale</td>
                <td>20$</td>
                <td>18/05/23</td>
              </tr>
              <tr>
                <td>BVRTS</td>
                <td>Artist</td>
                <td>1% of artist&apos;s sale</td>
                <td>40$</td>
                <td>23/05/23</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <ReferralModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
      <Footer />
    </div>
  );
}

export default ReferralProgram;
