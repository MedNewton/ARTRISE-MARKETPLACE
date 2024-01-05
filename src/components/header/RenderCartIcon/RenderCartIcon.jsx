import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useMediaQuery } from 'react-responsive';
import cart from '../../../assets/images/icon/cart.png';

function RenderCartIcon() {
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <Dropdown>
      <Dropdown.Toggle id={isDeviceMobile ? 'dropdownCartButtonMobileVersion' : 'dropdownCartButton'}>
        <img alt="shoping cart" className="avatar cart-icon-mobile-version-image" src={cart} />
      </Dropdown.Toggle>

      <Dropdown.Menu
        align="end"
        style={{ marginTop: '1vh' }}
      >
        <Dropdown.Item>
          No Items in Cart
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default RenderCartIcon;
