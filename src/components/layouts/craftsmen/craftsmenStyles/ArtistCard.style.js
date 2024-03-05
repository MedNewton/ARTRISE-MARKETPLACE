import styled from 'styled-components';
import {COLORS} from '../../../shared/styles-constants';

const calculateWidth = (props) => {
    if (props.isDeviceMobile && !props.isDeviceTablet) {
        return '100%';
    }
    if (!props.isDeviceMobile && props.isDeviceTablet) {
        return '47%';
    }
    if (!props.isDeviceMobile && !props.isDeviceTablet) {
        return '30.3333%';
    }
    // default width if none of the conditions match
    return '30.3333%';
};
export const CardContainer = styled.div`


    background-color: ${(props) => (props.theme === 'light' ? COLORS.WhiteFont : COLORS.BlackBG2)};
    margin: 0% 3% 3% 0px;
    height: fit-content;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
    transition: 0.3s;
    width: ${calculateWidth};

    &:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }
`;

export const InfoFollowButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 0px 10px 0px;
`;

export const InfoSectionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

export const ProfileImageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-right: 10px;
`;

export const ProfileImage = styled.img`
    margin-bottom: 0;

    margin-left: 1px;
    max-width: 70px;
    border-radius: 20px;
`;

export const Badge = styled.div`
    position: absolute;
    width: 15px; /* Adjust size as needed */
    height: 15px; /* Adjust size as needed */
    background-color: #ffcc00; /* Adjust badge color as needed */
    border-radius: 50%;
    /* Adjust position as needed */
    top: 0;
    right: 0;
    border: 2px solid white; /* Adjust to match the background of the container */
`;
export const ArtistInfo = styled.div`
    display: flex;
    flex-direction: column;
    /* padding: 12px; */
    text-align: center;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
`;

export const ArtistName = styled.h4`
    margin: 0;
    font-size: 2em; /* Adjust font-size as needed */
    color: ${(props) => (props.theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont)};

`;

export const ArtistType = styled.h5`
    margin: 0;
    font-size: 1.8em;
    font-style: italic;
    font-weight: 400;
    color: ${(props) => (props.theme === 'light' ? COLORS.BlackFont : COLORS.WhiteFont)};
`;
