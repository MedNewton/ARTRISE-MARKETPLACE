import styled from 'styled-components';
import { COLORS } from '../../shared/styles-constants';

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
  html: ${(props) => props?.htmlFor}
  color: ${(props) => (props.theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont)};
`;

export const SectionHeading = styled.h4`
  padding: 10px 0 10px 0;
  color: ${(props) => (props.theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont)};
`;

export const SummarySection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;
export const SummaryDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px #d7d7d7 solid;
  padding: 5px;
`;

export const DetailTitle = styled.div`
  font-size: 1.5em;
  font-weight: 500;
  color: ${(props) => (props.theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont)};
`;

export const ListButton = styled.button`
  width: 50%;
  height: fit-content;
  padding: 2% 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.theme === 'light' ? COLORS.WhiteFont : COLORS.BlackFont)};
  background-color: ${(props) => {
    if (props.theme === 'light' && !props.loading) {
      return COLORS.BlackFont;
    }
    if (props.theme === 'is_dark' && !props.loading) {
      return COLORS.WhiteFont;
    }
    if (props.theme === 'light' && props.loading) {
      return COLORS.GrayFont;
    }
    if (props.theme === 'is_dark' && props.loading) {
      return COLORS.OffWhiteFont;
    }
    return COLORS.GrayFont;
  }};
  border: solid 2px ${COLORS.BlackFont};
  font-family: inherit;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  cursor: pointer;

  &:hover {
    color: ${(props) => (props.theme === 'light' ? COLORS.WhiteFont : COLORS.BlackFont)};
  }
`;
