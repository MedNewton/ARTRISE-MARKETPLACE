/*eslint-disable*/
import React, { useState, createContext, useContext } from 'react';
import styled from 'styled-components';
import {useMediaQuery} from "react-responsive";
import Dropdown from "react-bootstrap/Dropdown";
import {SlOptions} from "react-icons/sl";

// Context to hold the active tab index
const TabContext = createContext();

// Styled components
const TabListStyled = styled.div`
  display: flex;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
    border-top: 1px solid #e0e0e0;
    padding-top: 15px;
    padding-bottom: 15px;

    

`;

const TabStyled = styled.button`

    background-color: transparent;
    // border: ${(props) => (props.theme === 'light' ? '2px solid black' : '2px solid white')};
    border: 2px solid transparent;
    padding: 0px 20px;
    height: 40px;
    font-size: initial;
    color: black;
    font-weight: bold;
    font-family: sans-serif;
    border-radius: 50px;
    margin: 0% 2%;
    
    
  cursor: pointer;
  //border: none;
  //outline: none;
  //border-bottom: 2px solid transparent;
    
    

  &:hover {
    opacity: 1;
      border: 2px solid black;
  }

  &.active {
    opacity: 1;
      background-color: green;
      color: blue;
      border: 2px solid transparent;
  }
`;

const TabPanelStyled = styled.div`
  display: none;

  &.active {
    display: block;
      margin: 0% 2%;
  }
`;

// Components
export const Tabs = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
            {children}
        </TabContext.Provider>
    );
};

export const TabList = ({ children }) => (
    <TabListStyled>
        {children}
    </TabListStyled>
);

export const Tab = ({ children, index }) => {
    const { activeIndex, setActiveIndex } = useContext(TabContext);
    const onClick = () => setActiveIndex(index);
    return(
        <TabStyled className={activeIndex === index ? 'active' : ''} onClick={onClick}>
            {children}
        </TabStyled>
    )
};

export const MoreTab = ({ children, baseIndex }) => {
    const { setActiveIndex } = useContext(TabContext);

    return (
        <Dropdown>
            <Dropdown.Toggle id="profileTabDropdown">
                <TabStyled><SlOptions /></TabStyled>
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
};

export const TabPanel = ({ children, index }) => {
    const { activeIndex } = useContext(TabContext);

    return (
        <TabPanelStyled className={activeIndex === index ? 'active' : ''}>
            {children}
        </TabPanelStyled>
    );
};
