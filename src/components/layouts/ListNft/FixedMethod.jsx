import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import { ref, set, update } from 'firebase/database';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import db from '../../../firebase';
import {
  DetailTitle,
  FixedMethodWrapper,
  Label, ListButton,
  SectionHeading,
  SummaryDetailsWrapper,
  SummarySection,
} from './FixedMethod.styles';
import { fetchCurrentUser } from '../../../utils/currentUserUtils';
import { fetchLazyOwned } from '../../../utils/lazyOwnedUtils';
import { fetchLazyListed } from '../../../utils/lazyListedUtils';
import { getCollections } from '../../../utils/collectionUtils';

DetailTitle.propTypes = { children: PropTypes.node };

function FixedMethod() {
  const theme = useSelector((state) => state.themeReducer.theme);
  const currentUserId = useSelector((state) => state.usersReducer.currentUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [shippingOption, setShippingOption] = useState('free');
  const [shippingPrice, setShippingPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  function getRandomInteger(min, max) {
    const minimum = Math.ceil(min);
    const maximum = Math.floor(max);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  function navigateToHomepage() {
    navigate('/');
  }
  const delay = (ms) => setTimeout(navigateToHomepage, ms);

  async function listForFixedPrice() {
    if (price <= 0) {
      toast.error(
        'NFT listing price can\'t be zero or less !',
        {
          position: 'top-left',
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        },
      );
    } else {
      setLoading(true);
      const newListingId = getRandomInteger(30, 1000000);
      const artworkId = window.location.href.toString()
        .split('id=')[1].toString();
      const artworkRef = ref(db, `artworks/${artworkId}`);
      await update(artworkRef, {
        listed: 'yes',
      });
      const listingRef = ref(db, `listings/${newListingId}`);
      await set(listingRef, {
        artwork_id: artworkId,
        likes: 0,
        price,
        shipping: shippingPrice,
      })
        .then(async () => {
          toast.success(
            'NFT listed successfully !',
            {
              position: 'top-left',
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            },
          );
          setLoading(false);
          if (currentUserId) {
            await fetchLazyListed(dispatch);
            await getCollections(dispatch);
            await fetchCurrentUser(dispatch, currentUserId);
            await fetchLazyOwned(dispatch, currentUserId);
          }
          toast.success(
            'Redirecting you to the homepage...',
            {
              position: 'top-left',
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            },
          );
          delay(5000);
        });
    }
  }

  const shippingOptions = useMemo(() => [
    {
      value: 'free',
      label: 'Free Shipping',
    },
    {
      value: 'fees',
      label: 'Add Shipping Fees',
    },
  ], []);

  return (
    <>
      <FixedMethodWrapper>
        <Label htmlFor="priceLabel">
          <SectionHeading theme={theme}>Price</SectionHeading>
          <input
            id="priceLabel"
            name="priceLabel"
            placeholder="Enter price for one item (ETH)"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </Label>

        <Label htmlFor="shippingPriceSelect">
          <SectionHeading theme={theme}>Shipping Type</SectionHeading>
          <Select
            id="shippingPriceSelect"
            className="multi-select"
            options={shippingOptions}
            value={shippingOptions.find((option) => option.value === shippingOption)}
            onChange={(selectedOption) => {
              setShippingOption(selectedOption?.value);
            }}
          />
        </Label>

        {shippingOption === 'fees' && (
          <Label htmlFor="shippingPriceInput">
            <SectionHeading theme={theme}>Shipping Price:</SectionHeading>
            <input
              id="shippingPriceInput"
              placeholder="Enter price for shipping cost"
              onChange={(e) => setShippingPrice(parseFloat(e.target.value))}
            />
          </Label>
        )}
        <SummarySection>
          <SectionHeading theme={theme}>Summary</SectionHeading>
          <SummaryDetailsWrapper>
            <DetailTitle theme={theme}>Price</DetailTitle>
            <DetailTitle theme={theme}>{price}</DetailTitle>
          </SummaryDetailsWrapper>

          <SummaryDetailsWrapper>
            <DetailTitle theme={theme}>Shipping Price</DetailTitle>
            <DetailTitle theme={theme}>{shippingOption === 'free' ? 'Free Shipping' : shippingPrice}</DetailTitle>
          </SummaryDetailsWrapper>

          <SummaryDetailsWrapper>
            <DetailTitle theme={theme}>Total</DetailTitle>
            <DetailTitle theme={theme}>
              {
              shippingOption === 'free'
                ? price
                : (price + shippingPrice)
            }
            </DetailTitle>
          </SummaryDetailsWrapper>

          <SummaryDetailsWrapper>
            <DetailTitle theme={theme}>ArtRise fees after sale</DetailTitle>
            <DetailTitle theme={theme}>15%</DetailTitle>
          </SummaryDetailsWrapper>
        </SummarySection>

        <ListButton
          onClick={() => listForFixedPrice()}
          theme={theme}
          loading={loading}
        >
          List this item
        </ListButton>
      </FixedMethodWrapper>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default FixedMethod;
