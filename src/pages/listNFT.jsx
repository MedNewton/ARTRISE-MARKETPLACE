/*eslint-disable*/
import React, { useState } from 'react';
import Footer from '../components/footer/Footer';
import 'react-tabs/style/react-tabs.css';
import 'react-toastify/dist/ReactToastify.css';
import FixedMethod from '../components/layouts/ListNft/FixedMethod';
import BidsMethod from '../components/layouts/ListNft/BidsMethod';
import styled from 'styled-components';

function ListItem() {


  const ListNftParentDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
  `

  const ListNftWrapper = styled.div`
  display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 60%;
    padding: 10px 0px;
  `


  const [selectedMethod, setSelectedMethod] = useState('');

  return (
    <ListNftParentDiv>
    <ListNftWrapper>
          <h4 className="title-create-item">Select method</h4>
          <div className="radio-container">
            <div className="radio-button">
              <label
                style={{
                  display: 'flex',
                  gap: '10px',
                }}
                htmlFor="fixedPrice"
              >
                <span className="icon-fl-tag" />
                <span>Fixed Price</span>

                <input
                  id="fixedPrice"
                  type="radio"
                  name="pricing"
                  value="fixed"
                  checked={selectedMethod === 'fixed'}
                  onChange={() => setSelectedMethod('fixed')}
                />
              </label>
            <div className="radio-button">
              <label
                style={{
                  display: 'flex',
                  gap: '10px',
                }}
                htmlFor="timedAuction"
              >
                <span className="icon-fl-icon-22" />
                <span>Timed Auction</span>
                <input
                  id="timedAuction"
                  type="radio"
                  name="pricing"
                  value="bids"
                  checked={selectedMethod === 'bids'}
                  onChange={() => setSelectedMethod('bids')}
                />
              </label>
            </div>
          </div>
        </div>
        {selectedMethod === 'fixed' && (
          <FixedMethod/>
        )}
        {selectedMethod === 'bids' && (
          <BidsMethod/>
        )}

    </ListNftWrapper>
      <Footer />
    </ListNftParentDiv>
  );
}

export default ListItem;
