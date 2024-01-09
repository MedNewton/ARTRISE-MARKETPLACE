import styled from 'styled-components';

export const FixedMethodWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  html: ${(props) => {
    props?.htmlFor;
  }}
  color: #727272;
`;

export const SectionHeading = styled.h4`
  padding: 10px 0 10px 0;
`;

export const Form = styled.form`
  width: 100%;
  color: #2aabd2;
`;
