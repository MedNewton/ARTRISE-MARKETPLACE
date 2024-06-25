import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useMediaQuery } from 'react-responsive';
import Footer from '../components/footer/Footer';
import ReferralModal from '../components/layouts/referralModal';
import { ImageWrapper, InnerWrapperA } from '../components/layouts/referralProgram/ReferralProgram.styles';

function ReferralProgram() {
  const [createModalShow, setCreateModalShow] = useState(false);
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  return (
    <div>
      <div className="referral-home-wrapper">
        <div className="flex-column-gap20">
          <div>
            <h3>Referral</h3>
          </div>
          <InnerWrapperA isDeviceMobile={isDeviceMobile}>
            <ImageWrapper
              isDeviceMobile={isDeviceMobile}
              isDeviceTablet={isDeviceTablet}
              src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="flex-column-gap20">
              <h4>
                Spread the Rise of Hybrid Art - Join Our Referral Program
              </h4>
              <h6>
                Share the joy of art and be rewarded! Our referral program allows
                you to invite artists and art enthusiasts to ArtRise, and in return,
                you&apos;ll both unlock exciting benefits. Embrace the power of art and
                connections by joining our referral program today.
              </h6>
              <div className="wrap-inner load-more mb-20">
                <button
                  type="submit"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={() => {
                    setCreateModalShow(true);
                  }}
                >
                  <span>Refer a Friend</span>
                </button>
              </div>
            </div>
          </InnerWrapperA>
        </div>

        <div className="flex-column-gap20">
          <div>
            <h3>Referral rewards</h3>
          </div>
          <div>
            <h6>Empower Art, Earn Together</h6>
          </div>
          <InnerWrapperA isDeviceMobile={isDeviceMobile}>
            <ImageWrapper
              isDeviceMobile={isDeviceMobile}
              isDeviceTablet={isDeviceTablet}
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <div className="flex-column-gap20">
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
          </InnerWrapperA>

          <InnerWrapperA isDeviceMobile={isDeviceMobile}>
            <ImageWrapper
              isDeviceMobile={isDeviceMobile}
              isDeviceTablet={isDeviceTablet}
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="flex-column-gap20">
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
          </InnerWrapperA>
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
