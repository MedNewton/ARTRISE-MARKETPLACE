import styled from 'styled-components';
import { COLORS } from '../../shared/styles-constants';

export const ArtworkPageWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: ${(props) => (props?.isDeviceMobile ? 'column' : 'row')};
    color: ${(props) => (props?.isDeviceMobile ? 'red' : 'green')};
    padding: 2% 2%;
    justify-content: space-between;
    align-items: ${(props) => (props?.isDeviceMobile ? 'center' : 'flex-start')};
`;

export const MainImageAttributesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props?.isDeviceMobile ? '80%' : '45%')};
    color: ${(props) => (props.theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont)};
`;

export const ArtworkDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props?.isDeviceMobile ? '80%' : '50%')};
    color: ${(props) => (props.theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont)};
`;

export const ArtworkName = styled.h2`
    color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
    padding-bottom: 20px;
`;
export const ArtworkCollectionName = styled.h5`
    color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
    padding-bottom: 20px;
`;
export const ArtworkDescription = styled.p`
    color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
    padding-bottom: 20px;
`;

export const OwnersSectionDetailsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 30px;
`;

export const OwnerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: ${(props) => (props.theme === 'light' ? COLORS.LightGrayBG : COLORS.BlackBG2)};
    gap: 20px;
    border-radius: 15px;
    padding: 5px;
    align-items: center;
`;
export const AvatarWrapper = styled.div`
    width: 40px;
    height: 40px;
    background-color: transparent;
    cursor: pointer;
`;
export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
export const OwnerNameHeading = styled.h5`
    font-size: 15px;
    line-height: 20px;
    font-weight: 600;
    color: ${(props) => (props.theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont)};
`;
export const OwnerName = styled.p`
    color: ${(props) => (props.theme === 'light' ? COLORS.GrayFont : COLORS.WhiteFont)};
`;

export const PriceSectionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 10px;
`;
export const PriceSubSection = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
`;
export const PriceHeading = styled.h5`
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
    color: ${(props) => (props.theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont)};
`;

export const PriceNotification = styled.p`
    color: ${(props) => (props.theme === 'light' ? COLORS.GrayFont : COLORS.WhiteFont)};
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 25px;
    margin: 20px 0px;
`;

export const PhysicalImagesPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px 0px;
`;

export const PhysicalImagesWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
`;

export const PhyscialImage = styled.div`
    width: 150px;
    height: 150px;
`;

export const ModalInputLabel = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px 0px;
`;

export const ModalInputField = styled.input`
    border-color: rgb(122, 121, 138);
    padding: 5px;
`;

export const LikeShareButtonsWrapper = styled.div`
display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0px 0px 20px 0px;
    
`;

export const LikeButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${(props) => (props.theme === 'light' ? COLORS.LightGrayBG : COLORS.BlackBG2)};
    gap: 5px;
    align-items: center;
    padding: 9px 15px;
    border-radius: 40px;
    width: auto;
    font-size: 15px;
    cursor: pointer;
    color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
`;
export const ShareButtonWrapper = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    //width: 100%;
    background-color: ${(props) => (props.theme === 'light' ? COLORS.LightGrayBG : COLORS.BlackBG2)};
    gap: 20px;
    align-items: center;
    padding: 9px 15px;
    border-radius: 40px;
    width: auto;
    font-size: 17px;
    color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};
`;
