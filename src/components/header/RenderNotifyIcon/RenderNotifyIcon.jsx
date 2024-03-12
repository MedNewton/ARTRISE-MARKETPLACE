import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoMdNotificationsOutline } from 'react-icons/io';
import styled from 'styled-components';

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

function RenderNotifyIcon() {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdownNotifButton">
        <IconWrapper>
          <IoMdNotificationsOutline style={{ width: '26px', height: '28px' }} />
        </IconWrapper>
      </Dropdown.Toggle>
      <Dropdown.Menu
        align="end"
        style={{ marginTop: '1vh' }}
      >
        <Dropdown.Item>
          No new notifications
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default RenderNotifyIcon;
