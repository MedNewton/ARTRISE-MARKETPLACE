import styled from 'styled-components';

export const MenuElementButton = styled.button`
    max-width: 100%;
    background-color: transparent;
   `;

export const ExpandableMenuElementButton = styled.button`
    width: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
   `;

export const ExpandableMenuIconWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    font-size: larger;
    font-weight: bold;
`;
