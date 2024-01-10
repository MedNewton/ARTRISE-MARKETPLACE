import styled from 'styled-components';
import { COLORS } from '../../shared/styles-constants';

export const PageTitle = styled.h2`
  padding: 20px 0 10px 0;
  color:  ${(props) => (props.theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont)};
`;

export const DetailTitle = styled.h5`
  padding: 20px 0 10px 0;
  color:  ${(props) => (props.theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont)};
`;

export const ListNftParentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
`;

export const ListNftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1440px;
  width: 60%;
  padding: 10px 0;
`;

export const RadioButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 7rem;
`;

export const RadioButton = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #727272;
  padding: 15px;
  cursor: pointer;
  transition: border-color 0.3s;
  width: 100%;
  font-size: 1.5em;
  font-weight: 500;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 8px;

  &:hover {
    border: 1px solid black;
  }
`;

export const RadioButtonLabelWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  html: ${(props) => props?.htmlFor}
`;
