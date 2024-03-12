import styled from 'styled-components';

export const ArtistsContainer = styled.div`
    display: flex;
    flex-direction: ${(props) => (props?.isDeviceMobile === false ? 'row' : 'column')};
    align-items: ${(props) => (props?.isDeviceMobile === false ? 'center' : 'normal')};
    flex-wrap: wrap;
`;
