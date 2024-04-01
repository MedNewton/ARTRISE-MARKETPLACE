import styled from 'styled-components';

export const SectionTitleWrapper = styled.h2`
    padding: ${(props) => (props.isDeviceMobile ? '0px 0px 25px 0px' : '25px 0px 25px 0px')};
`;
