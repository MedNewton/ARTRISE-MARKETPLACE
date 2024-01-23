import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBook, FaFileAlt, FaHandsHelping, FaLink, FaPlus, FaRegUser, FaSignOutAlt, FaSlidersH,
} from 'react-icons/fa';
import { BiCoinStack } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { Logout } from '../../../services/AuthServices/Logout';

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
        <img alt="The Artist" className="avatar" src={UserPdpLink || pdp} />
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
          <Dropdown.Item>
            <Link to="/tokenize">
              <BiCoinStack size={15} />
              Tokenize
            </Link>
          </Dropdown.Item>
        ) : (
          ''
        )}
        {(localStorage.getItem('profileType') === 'artist' && localStorage.getItem('walletAddress')) ? (
          <Dropdown.Item>
            <Link to="/creator-choice">
              <FaPlus size={15} />
              Create
            </Link>
          </Dropdown.Item>
        ) : (
          ''
        )}
        <Dropdown.Item>
          <Link to="/referral-program">
            <FaLink size={15} />
            Referral
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to="/learn">
            <FaBook size={15} />
            Learn
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to="/learn">
            <FaFileAlt size={18} />
            Resources
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to="/help-center">
            <FaHandsHelping size={17} />
            Help
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to="/settings">
            <FaSlidersH size={15} />
            Settings
          </Link>
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
