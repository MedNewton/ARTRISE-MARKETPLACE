import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import imgsun from '../../assets/images/icon/sun.png';
import imgmoon from '../../assets/images/icon/moon.png';
import { setAppTheme } from '../../redux/actions/themeActions';

function DarkMode() {
  const dispatch = useDispatch();
  const isDeviceMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const { body } = document;
  const lightTheme = 'light';
  const darkTheme = 'is_dark';

  // Use state to manage the themeState
  const [themeState, setThemeState] = useState(lightTheme);

  // Use effect to apply the initial themeState class on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || lightTheme;
    setThemeState(savedTheme);
    body.classList.add(savedTheme);
  }, [body]);

  const switchTheme = (e) => {
    e.preventDefault();
    const newTheme = themeState === darkTheme ? lightTheme : darkTheme;
    setThemeState(newTheme);

    if (newTheme === darkTheme) {
      document.getElementById('themeIcon').src = imgmoon;
      body.classList.replace(lightTheme, darkTheme);
      localStorage.setItem('theme', darkTheme);
      const theme = darkTheme;
      dispatch(setAppTheme({ theme }));
    } else {
      document.getElementById('themeIcon').src = imgsun;
      body.classList.replace(darkTheme, lightTheme);
      localStorage.setItem('theme', lightTheme);
      const theme = lightTheme;
      dispatch(setAppTheme({ theme }));
    }
  };

  const doNotNavigateHandlerFunction = (e) => {
    e.preventDefault();
  };

  return (
    <Dropdown>
      <div className={isDeviceMobile ? 'mode_switcher_mobile_version' : 'mode_switcher'}>
        {!isDeviceMobile && (
          <h6>
            Dark mode
            <strong>Available</strong>
          </h6>
        )}

        <Link to={doNotNavigateHandlerFunction} onClick={(e) => switchTheme(e)}>
          <img id="themeIcon" src={themeState === darkTheme ? imgmoon : imgsun} alt="" />
        </Link>
      </div>
    </Dropdown>
  );
}

export default DarkMode;
