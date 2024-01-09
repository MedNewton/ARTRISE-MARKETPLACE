/*eslint-disable*/
import React, { useState } from 'react';
import Footer from '../components/footer/Footer';
import 'react-tabs/style/react-tabs.css';
import 'react-toastify/dist/ReactToastify.css';
import FixedMethod from '../components/layouts/ListNft/FixedMethod';
import BidsMethod from '../components/layouts/ListNft/BidsMethod';
import { SlTag } from 'react-icons/sl';
import {
  ListNftParentDiv,
  ListNftWrapper,
  PageTitle, RadioButton, RadioButtonLabelWrapper,
  RadioButtonsContainer, Label
} from '../components/layouts/ListNft/listNFT.styles';

function ListItem() {

  const [selectedMethod, setSelectedMethod] = useState('');

  return (
    <>
      <ListNftParentDiv>
        <ListNftWrapper>
          <div>
            <PageTitle>
              List your NFT
            </PageTitle>
            <h5 className="subTitleCreate">
              Show your NFT to all the users on ARTRISE and list it for sale
            </h5>
          </div>
          <h4 className="title-create-item">Select method</h4>
          <RadioButtonsContainer>
            <RadioButton>
              <Label htmlFor="fixedPrice">
                <RadioButtonLabelWrapper>
                  <SlTag/>
                  <span>Fixed Price</span>
                </RadioButtonLabelWrapper>
                <input
                  id="fixedPrice"
                  type="radio"
                  name="pricing"
                  value="fixed"
                  checked={selectedMethod === 'fixed'}
                  onChange={() => setSelectedMethod('fixed')}
                />
              </Label>
            </RadioButton>
            <RadioButton>
              <Label htmlFor="timedAuction">
                <RadioButtonLabelWrapper>
                  <SlTag/>
                  <span>Timed Auction</span>
                </RadioButtonLabelWrapper>
                <input
                  id="timedAuction"
                  type="radio"
                  name="pricing"
                  value="bids"
                  checked={selectedMethod === 'bids'}
                  onChange={() => setSelectedMethod('bids')}
                />
              </Label>
            </RadioButton>
          </RadioButtonsContainer>
          {selectedMethod === 'fixed' && (
            <FixedMethod/>
          )}
          {selectedMethod === 'bids' && (
            <BidsMethod/>
          )}
        </ListNftWrapper>
      </ListNftParentDiv>
      <Footer/>
    </>
  );
}

export default ListItem;
