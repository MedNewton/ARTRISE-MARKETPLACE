import React, { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import 'react-toastify/dist/ReactToastify.css';
import { SlTag } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import {
  ListNftParentDiv,
  ListNftWrapper,
  PageTitle, RadioButton, RadioButtonLabelWrapper,
  RadioButtonsContainer, Label, DetailTitle,
} from '../components/layouts/ListNft/listNFT.styles';
import FixedMethod from '../components/layouts/ListNft/FixedMethod';
import BidsMethod from '../components/layouts/ListNft/BidsMethod';
import Footer from '../components/footer/Footer';

import { SectionHeading } from '../components/layouts/ListNft/FixedMethod.styles';

function ListItem() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const theme = useSelector((state) => state.themeReducer.theme);

  return (
    <>
      <ListNftParentDiv>
        <ListNftWrapper>
          <div>
            <PageTitle theme={theme}>
              List your NFT
            </PageTitle>
            <DetailTitle theme={theme}>
              Show your NFT to all the users on ARTRISE and list it for sale
            </DetailTitle>
          </div>
          <SectionHeading>Select method</SectionHeading>
          <RadioButtonsContainer>
            <RadioButton>
              <Label htmlFor="fixedPrice">
                <RadioButtonLabelWrapper>
                  <SlTag />
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
                  <SlTag />
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
            <FixedMethod />
          )}
          {selectedMethod === 'bids' && (
            <BidsMethod />
          )}
        </ListNftWrapper>
      </ListNftParentDiv>
      <Footer />
    </>
  );
}

export default ListItem;
