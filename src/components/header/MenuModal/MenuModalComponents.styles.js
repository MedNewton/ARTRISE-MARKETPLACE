import styled from 'styled-components';

export const SwitchModeButton = styled.button`
    background-color: transparent;
    border: ${(props) => (props.theme === 'light' ? '2px solid black' : '2px solid white')};
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
    padding-left: 24px;
    padding-right: 24px;
    height: 40px;
    font-size: initial;
    color: ${(props) => ((props.theme) === 'light' ? 'black' : 'white')};
    font-weight: bold;
    font-family: sans-serif;
    border-radius: 50px;
`;
