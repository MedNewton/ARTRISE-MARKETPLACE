import React from 'react';
import { TwitterLoginButton, createSvgIcon } from 'react-social-login-buttons';
import PropTypes from 'prop-types';
import { FaXTwitter } from 'react-icons/fa6';

const CustomTwitterLoginButton = React.memo((props) => {
  const { Twitter, signInWithTwitter } = props;
  return (
    <TwitterLoginButton
      text={
        Twitter === 'No Twitter added yet ...'
          || Twitter === ''
          || Twitter === ' '
          ? 'Verify with Twitter'
          : 'Verified'
      }
      icon={createSvgIcon(FaXTwitter)}
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
});

CustomTwitterLoginButton.propTypes = {
  Twitter: PropTypes.string,
  signInWithTwitter: PropTypes.func,
};

CustomTwitterLoginButton.defaultProps = {
  Twitter: '',
  signInWithTwitter: () => { },
};

export default CustomTwitterLoginButton;
