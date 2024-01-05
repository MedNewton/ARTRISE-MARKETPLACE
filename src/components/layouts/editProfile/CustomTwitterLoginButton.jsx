import React from 'react';
import { TwitterLoginButton } from 'react-social-login-buttons';
import PropTypes from 'prop-types';
import xTwitter from '../../../assets/images/svg/xTwitter.svg';

function CustomTwitterLoginButton(props) {
  const { Twitter, signInWithTwitter } = props;
  const iconElement = <img src={xTwitter} alt="X" />;
  return (
    <TwitterLoginButton
      text={
      Twitter === 'No Twitter added yet ...'
      || Twitter === ''
      || Twitter === ' '
        ? 'Verify with Twitter'
        : 'Verified'
    }
      icon={iconElement}
      activeStyle={{ background: '#2a2a2a' }}
      onClick={(e) => {
        e.preventDefault();
        if (
          Twitter === 'No Twitter added yet ...'
        || Twitter === ''
        || Twitter === ' '
        ) {
          signInWithTwitter();
        }
      }}
      style={
      Twitter === 'No Twitter added yet ...'
      || Twitter === ''
      || Twitter === ' '
        ? {
          cursor: 'context-menu',
          fontSize: '16px',
          background: 'black',
        }
        : { background: 'black', fontSize: '16px' }
    }
    />
  );
}
CustomTwitterLoginButton.propTypes = {
  Twitter: PropTypes.string,
  signInWithTwitter: PropTypes.func,
};

CustomTwitterLoginButton.defaultProps = {
  Twitter: '',
  signInWithTwitter: () => {},
};

export default CustomTwitterLoginButton;
