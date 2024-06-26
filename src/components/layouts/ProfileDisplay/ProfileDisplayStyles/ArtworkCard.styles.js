import styled from 'styled-components';
import { COLORS } from '../../../shared/styles-constants';

const calculateWidth = (props) => {
  if (props.showFilter && !props.isDeviceMobile && !props.isDeviceTablet) {
    return '23%';
  } if (!props.showFilter && !props.isDeviceMobile && !props.isDeviceTablet) {
    return '18%';
  } if (!props.showFilter && !props.isDeviceMobile && props.isDeviceTablet) {
    return '48%';
  } if (!props.showFilter && props.isDeviceMobile && !props.isDeviceTablet) {
    return '48%';
  }
  // default width if none of the conditions match
  return '80%';
};

const calculatePriceFont = (props) => {
  if (props.isWidthLessThan470 && !props.isWidthLessThan380) {
    return 'small';
  } if (!props.isWidthLessThan470 && props.isWidthLessThan380) {
    return 'smaller';
  }
  return 'medium';
};

export const Card = styled.div`
width: ${calculateWidth};
  height: ${(props) => (props.unlistedCard ? 'auto' : 'auto')};
  margin: 10px 2% 10px 0px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background-color: ${(props) => (props.theme === 'light' ? COLORS.WhiteFont : COLORS.BlackBG2)};
  &:hover {
    transform: translateY(-2px);
  }
`;

export const ArtworkName = styled.div`
  color: white;
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 16px;
  font-weight: bold;
`;

export const CardMedia = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: #f2f2f2;

  &:hover {
     ${ArtworkName} {
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
    opacity: 0; /* Hidden by default, becomes visible on hover */
    transition: opacity 0.3s;
  }

  ${Card}:hover &::before {
    opacity: 1;
  }
`;

export const CardContent = styled.div`
  padding: 10px 10px 0px 10px;
`;

export const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  //margin-top: 10px;

  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 10px;
  }

  span {
    font-size: large;
    font-weight: bold;
  }
`;

export const PriceTag = styled.div`
  font-size: ${calculatePriceFont};
  font-weight: normal;
`;
export const DescriptionWrapper = styled.div`
padding: 10px;
margin: 10px auto;
`;

export const DescriptionTag = styled.p`
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const PriceSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #e6e6e6;
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const PriceHeading = styled.div`
  font-size: ${calculatePriceFont};
  font-weight: normal;
  color: #81754e;
`;

export const BuyNowButtonWrapper = styled.div`
display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const BuyNowButton = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
  padding: 0px 30px;
  height: 35px;
  font-size: 14px;
  color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
  border-color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
  font-weight: 600;
  font-family: sans-serif;
  margin: 15px 0px;
  border-radius: 20px;
  &:hover {
    color: ${(props) => (props.theme === 'light' ? 'white' : 'black')};
    background-color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
  }
`;
