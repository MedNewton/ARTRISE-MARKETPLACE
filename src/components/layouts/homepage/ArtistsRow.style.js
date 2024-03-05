import styled from 'styled-components';

export const ArtistsProfilesWrapper = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.isDeviceMobile ? 'column' : 'row')};
    margin-top: 20px;
    row-gap: 10px;
    max-width: 800px;
    width: 100%;
    justify-content: space-evenly;
    `;
