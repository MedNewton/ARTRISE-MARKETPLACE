import styled from 'styled-components';

const findFlexDirection = (props) => {
  if (!props.isDeviceMobile && !props.isDeviceTablet) {
    return 'row';
  } if (!props.isDeviceMobile && props.isDeviceTablet) {
    return 'row';
  } if (props.isDeviceMobile && !props.isDeviceTablet) {
    return 'column';
  }
  // default width if none of the conditions match
  return 'row';
};

const calculateFilterWidth = (props) => {
  if (!props.isDeviceMobile && !props.isDeviceTablet) {
    return '20%';
  } if (!props.isDeviceMobile && props.isDeviceTablet) {
    return '40%';
  } if (props.isDeviceMobile && !props.isDeviceTablet) {
    return '80%';
  }
  // default width if none of the conditions match
  return '20%';
};

const calculateFilterHeight = (props) => {
  if (!props.isDeviceMobile && !props.isDeviceTablet) {
    return '70vh';
  } if (!props.isDeviceMobile && props.isDeviceTablet) {
    return '';
  } if (props.isDeviceMobile && !props.isDeviceTablet) {
    return '';
  }
  // default width if none of the conditions match
  return '70vh';
};

export const FilterArtworksWrapper = styled.div`
display:flex;
flex-direction: ${findFlexDirection};
align-items:  ${(props) => (props.isDeviceMobile === true ? 'center' : '')};
`;

export const ArtistArtworksWrapper = styled.div`
display:flex;
flex-direction: row;
flex-wrap: wrap;
width:100%;
max-width:100%;
margin-left: ${(props) => (props.showFilter === false ? 'auto' : '2vw')};
justify-content: ${(props) => (props.isDeviceMobile === true ? 'center' : '')};
`;

export const FilterContent = styled.div`
width: ${calculateFilterWidth};
height: ${calculateFilterHeight};
overflow-y: scroll;
padding: 20px 10px 20px 10px;
`;
