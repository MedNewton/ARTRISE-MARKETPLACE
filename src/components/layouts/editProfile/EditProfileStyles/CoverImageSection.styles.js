import styled from 'styled-components';
import { COLORS } from '../../../shared/styles-constants';

export const CoverSectionWrapper = styled.div`
margin-bottom: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    `;

export const CoverSection = styled.div`
max-width: 1250px;
width: 1250px;
height: 260px;
background-color: ${COLORS.LightGrayBG};
margin: 0 auto;
border-radius: 15px;
display: flex;
flex-direction: row;
justify-content: center;
`;

export const CardMedia = styled.div`
width: 100%;
overflow: hidden;
border-radius: 15px;
`;

export const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UploadSection = styled.div`
  text-align: center;
  margin-top: 10px;
`;

export const UploadButton = styled.label`
  display: inline-block;
  color: #fff;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none;
`;
