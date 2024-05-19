import React, { useState, createContext, useContext } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { SlOptions } from 'react-icons/sl';
import { COLORS } from '../../shared/styles-constants';

const TabContext = createContext();

const TabListStyled = styled.div`
    display: flex;
    background-color: ${(props) => (props.theme === 'light' ? 'white' : COLORS.BlackBG2)};
    border-bottom: 1px solid transparent;
    border-top: 1px solid transparent;
    padding-top: 15px;
    padding-bottom: 15px;
    border-color: ${(props) => (props.theme === 'light' ? '#e0e0e0' : 'transparent')};
`;

const TabStyled = styled.button`
    background-color: transparent;
    border: 2px solid transparent;
    padding: 0px 20px;
    height: 40px;
    font-size: initial;
    color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
    font-weight: bold;
    font-family: sans-serif;
    border-radius: 50px;
    margin: 0% 2%;
    cursor: pointer;

    &:hover {
        opacity: 1;
        border-color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};;
    }

    &.active {
        opacity: 1;
        background-color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
        color: ${(props) => (props.theme === 'light' ? 'white' : 'black')};
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
  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabContext.Provider>
  );
}

export function TabList({ children, theme }) {
  return (
    <TabListStyled theme={theme}>
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
