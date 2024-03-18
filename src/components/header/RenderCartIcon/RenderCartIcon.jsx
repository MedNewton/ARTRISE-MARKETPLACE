import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { LuShoppingCart } from 'react-icons/lu';

const IconWrapper = styled.div`
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 10px;
    color: #000000;
`;
function RenderCartIcon() {
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 1200px)' });

  // const isDeviceTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

  return (
    <Dropdown>
      <Dropdown.Toggle id={isDeviceMobile ? 'dropdownCartButtonMobileVersion' : 'dropdownCartButton'}>
        <IconWrapper>
          <LuShoppingCart style={{ width: '23px', height: '28px' }} />
        </IconWrapper>
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
