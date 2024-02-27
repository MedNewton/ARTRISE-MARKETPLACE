import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import {
  FaBook, FaFileAlt, FaLink, FaPlus, FaRegUser, FaSignOutAlt, FaSlidersH,
} from 'react-icons/fa';
import { BiCoinStack } from 'react-icons/bi';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HiOutlineUser } from 'react-icons/hi';
import { Logout } from '../../../services/AuthServices/Logout';

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

function GetProfileLink(UserPdpLink, pdp) {
  if ((UserPdpLink) && (UserPdpLink !== pdp)) {
    return <img alt="The Artist" className="avatar" src={UserPdpLink || pdp} />;
  } if ((UserPdpLink) && (UserPdpLink === pdp)) {
    return (
      <IconWrapper>
        <HiOutlineUser style={{ width: '25px', height: '28px' }} />
      </IconWrapper>
    );
  }
  return (
    <IconWrapper>
      <HiOutlineUser style={{ width: '25px', height: '28px' }} />
    </IconWrapper>
  );
}
function RenderProfileIcon(props) {
  const { UserPdpLink, disconnect, dispatch } = props;
  const nav = useNavigate();

  const [pdp] = useState(
    'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=',
  );

  const logoutHandler = async () => {
    try {
      await Logout(disconnect, nav, dispatch);
    } catch (error) {
      console.error(error);
    }
  };

  const ArtistProfileHandler = () => {
    nav(`/displayProfile?artist=${localStorage?.getItem('userId')}`);
  };
  const MemberProfileHandler = () => {
    nav(`/displayProfile?member=${localStorage?.getItem('userId')}`);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdownMenuButton">
        {
            GetProfileLink(UserPdpLink, pdp)
          }
      </Dropdown.Toggle>

      <Dropdown.Menu
        align="end"
        style={{ marginTop: '1vh' }}
      >
        {localStorage.getItem('profileType') === 'artist' && (
          <Dropdown.Item onClick={ArtistProfileHandler}>
            <FaRegUser size={15} />
            Profile
          </Dropdown.Item>
        )}
        {localStorage.getItem('profileType') === 'member' && (
          <Dropdown.Item onClick={MemberProfileHandler}>
            <FaRegUser size={15} />
            Profile
          </Dropdown.Item>
        )}
        {(localStorage.getItem('profileType') === 'member' && localStorage.getItem('walletAddress')) ? (
          <Dropdown.Item onClick={() => nav('/tokenize')}>
            <BiCoinStack size={15} />
            Tokenize
          </Dropdown.Item>
        ) : (
          ''
        )}
        {(localStorage.getItem('profileType') === 'artist' && localStorage.getItem('walletAddress')) ? (
          <Dropdown.Item onClick={() => nav('/creator-choice')}>
            <FaPlus size={15} />
            Create
          </Dropdown.Item>
        ) : (
          ''
        )}
        <Dropdown.Item onClick={() => nav('/referral-program')}>
          <FaLink size={15} />
          Referral
        </Dropdown.Item>
        <Dropdown.Item onClick={() => nav('/learn')}>
          <FaBook size={15} />
          Learn
        </Dropdown.Item>
        <Dropdown.Item onClick={() => nav('/help-center')}>
          <FaFileAlt size={18} />
          How to use
        </Dropdown.Item>
        <Dropdown.Item onClick={() => nav('/settings')}>
          <FaSlidersH size={15} />
          Settings
        </Dropdown.Item>
        <Dropdown.Item
          onClick={(e) => {
            e.preventDefault();
            logoutHandler();
          }}
        >
          <FaSignOutAlt size={15} />
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

RenderProfileIcon.propTypes = {
  UserPdpLink: PropTypes.string,
  disconnect: PropTypes.func,
  dispatch: PropTypes.func,
};

RenderProfileIcon.defaultProps = {
  UserPdpLink: '',
  disconnect: () => {},
  dispatch: () => {},
};

export default RenderProfileIcon;
