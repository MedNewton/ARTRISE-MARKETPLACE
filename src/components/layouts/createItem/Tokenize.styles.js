import styled from 'styled-components';

export const PageWidthWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.isDeviceMobile ? '90%' : '60%')}
`;
