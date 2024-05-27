import React, {
  useState, createContext, useContext, useMemo,
} from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { SlOptions } from 'react-icons/sl';
import PropTypes from 'prop-types';
import { COLORS } from '../../shared/styles-constants';

const TabContext = createContext();

const TabListStyled = styled.div`
    display: flex;
    background-color: ${(props) => (props.theme === 'light' ? 'white' : COLORS.BlackBG2)};
    border-bottom: 1px solid transparent;
    border-top: 1px solid transparent;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 2%;
    border-color: ${(props) => (props.theme === 'light' ? '#e0e0e0' : 'transparent')};
    flex-wrap: ${(props) => (props.isDeviceMobile === true ? 'nowrap' : '')};
    overflow-x: ${(props) => (props.isDeviceMobile === true ? 'scroll' : '')};
`;

const TabStyled = styled.button`
    background-color: transparent;
    padding: 0px 15px;
    margin: 0px 5px 0px 0px;
    height: 40px;
    font-size: initial;
    color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
    font-weight: bold;
    font-family: sans-serif;
    border-radius: 50px;
    cursor: pointer;

    &:hover {
        opacity: 1;
        background-color: ${(props) => (props.theme === 'light' ? COLORS.LightGrayBG : 'white')};
        color: ${(props) => (props.theme === 'light' ? COLORS.BlackFont : 'black')};
    }

    &.active {
        opacity: 1;
        background-color: ${(props) => (props.theme === 'light' ? COLORS.LightGrayBG : 'white')};
        color: ${(props) => (props.theme === 'light' ? COLORS.BlackFont : 'black')};
        border-color: transparent !important;
    }
`;

const TabPanelStyled = styled.div`
    display: none;

    &.active {
        display: block;
        margin: 0% 2%;
    }
`;

export function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const contextValue = useMemo(() => ({ activeIndex, setActiveIndex }), [activeIndex, setActiveIndex]);

  return (
    <TabContext.Provider value={contextValue}>
      {children}
    </TabContext.Provider>
  );
}

export function TabList({ children, theme, isDeviceMobile }) {
  return (
    <TabListStyled theme={theme} isDeviceMobile={isDeviceMobile}>
      {children}
    </TabListStyled>
  );
}

export function Tab({ children, index, theme }) {
  const { activeIndex, setActiveIndex } = useContext(TabContext);
  const onClick = () => setActiveIndex(index);
  return (
    <TabStyled
      className={activeIndex === index ? 'active' : ''}
      onClick={onClick}
      theme={theme}
    >
      {children}
    </TabStyled>
  );
}

export function MoreTab({ children, baseIndex, theme }) {
  const { setActiveIndex } = useContext(TabContext);

  return (
    <Dropdown>
      <Dropdown.Toggle id="profileTabDropdown">
        <TabStyled theme={theme}><SlOptions /></TabStyled>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {React.Children.map(children, (child, index) => (
          <Dropdown.Item onClick={() => setActiveIndex(baseIndex + index)}>
            {child.props.children}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export function TabPanel({ children, index }) {
  const { activeIndex } = useContext(TabContext);
  return (
    <TabPanelStyled className={activeIndex === index ? 'active' : ''}>
      {children}
    </TabPanelStyled>
  );
}

// props validations

Tabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
Tabs.defaultProps = {
  children: '',
};

TabList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  theme: PropTypes.string,
  isDeviceMobile: PropTypes.bool,
};
TabList.defaultProps = {
  children: '',
  theme: 'light',
  isDeviceMobile: false,
};

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  index: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  theme: PropTypes.string,
};
Tab.defaultProps = {
  children: '',
  index: 0,
  theme: 'light',
};

MoreTab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  baseIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  theme: PropTypes.string,
};
MoreTab.defaultProps = {
  children: '',
  baseIndex: PropTypes.oneOfType([
    '',
    0,
  ]),
  theme: 'light',
};

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  index: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};
TabPanel.defaultProps = {
  children: '',
  index: 0,
};
