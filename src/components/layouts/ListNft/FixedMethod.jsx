/*eslint-disable*/
import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import { ref, set, update } from 'firebase/database';
import db from '../../../firebase';


function FixedMethod() {
  const [price, setPrice] = useState(0);
  const [shippingOption, setShippingOption] = useState('free');
  const [shippingPrice, setShippingPrice] = useState(0);

  function getRandomInteger(min, max) {
    const minimum = Math.ceil(min);
    const maximum = Math.floor(max);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  function navigateToHomepage() {
    window.location.href = '/';
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
        price: parseFloat(price),
        shipping: parseFloat(shippingPrice),
      })
        .then(() => {
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

          delay(7000);
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
  ], [])

  return (
    <>
      <form onSubmit={listForFixedPrice}>
        <div className="mt-4 ">
          <label htmlFor="priceLabel" className="title-create-item">
            Price
            <input
              id="priceLabel"
              type="number"
              placeholder="Enter price for one item (ETH)"
              onChange={(e) => {
                setPrice(parseInt(e.target.value, 10));
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="shippingPriceSelect" className="title-create-item">
            <Select
              id="shippingPriceSelect"
              className="" //multi-select
              options={shippingOptions}
              value={shippingOptions.find((option) => option.value === shippingOption)}
              onChange={(selectedOption) => {
                setShippingOption(selectedOption?.value);
              }}
            />
            Shipping Price:
          </label>

          {shippingOption === 'fees' && (
            <div>
              <label htmlFor="shippingPriceInput" className="mt-4">
                <input
                  id="shippingPriceInput"
                  type="number"
                  placeholder="Enter price for shipping cost"
                  value={shippingPrice}
                  onChange={(e) => setShippingPrice( parseInt(e.target.value, 10) )}
                />
                Enter price for shipping cost:
              </label>
            </div>
          )}
        </div>
        <div className="summary-main">
          <h4 className="mb-4">Summary</h4>
          <div className="summary-details">
            <h5 className="subTitleCreate">Price</h5>
            <h5 className="subTitleCreate">{price}</h5>
          </div>
          <div className="summary-details">
            <h5 className="subTitleCreate">Shipping Price</h5>
            <h5 className="subTitleCreate">
              {shippingOption === 'free' ? 'Free Shipping' : shippingPrice}
            </h5>
          </div>
          <div className="summary-details">
            <h5 className="subTitleCreate">Total</h5>
            <h5 className="subTitleCreate">
              {
                shippingOption === 'free'
                  ? price
                  : (price + shippingPrice)
              }
            </h5>
          </div>
          <div className="summary-details">
            <h5 className="subTitleCreate">ArtRise fees after sale</h5>
            <h5 className="subTitleCreate">15%</h5>
          </div>

        </div>
        <button type="submit" className="listButton">List this item</button>
      </form>
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
  )
}

// FixedMethod.propTypes = {
//   mediaUrl: PropTypes.string,
// };
//
// FixedMethod.defaultProps = {
//   mediaUrl: '', // Provide a default value (e.g., an empty string) or null based on your use case.
// };

export default FixedMethod;
