import styled from 'styled-components';

export const InnerWrapperA = styled.div`
    display: flex;
    flex-direction: ${(props) => (props?.isDeviceMobile ? 'column' : 'row')};
    align-items: ${(props) => (props?.isDeviceMobile ? 'flex-start;' : 'center')};
    width: 100%;
    gap: 20px;
`;

const calculateWidth = (props) => {
  if (!props.isDeviceMobile && !props.isDeviceTablet) {
    return '40%';
  }
  if (!props.isDeviceMobile && props.isDeviceTablet) {
    return '50%';
  }
  if (props.isDeviceMobile && !props.isDeviceTablet) {
    return '100%';
  }
  return '40%';
};
export const ImageWrapper = styled.img`
    max-width: ${calculateWidth};
    width: 100%;
    object-fit: cover;
    background-color: #f1f1f1;
    box-shadow: 0px 0px 5px 1px #f1f1f1;
    border: solid 3px #fff;
    border-radius: 10px;
`;
