import styled from 'styled-components';

export const PageWidthWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.isDeviceMobile ? '90%' : '60%')};
    margin-top: ${(props) => (props.isDeviceMobile ? '45px' : '45px')};
`;
