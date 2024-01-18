import React from 'react';
import PropTypes from 'prop-types';
import { getDownloadURL, ref as SRef, uploadBytesResumable } from 'firebase/storage';
import {
  CoverSection,
  CardMedia,
  CoverImage,
  UploadSection,
  UploadButton,
  FileInput,
  CoverSectionWrapper,
} from './EditProfileStyles/CoverImageSection.styles'; // Adjust the path to your actual styled components file
import storage from '../../../storage';

const CoverImageSection = React.memo((props) => {
  const { coverLink, setCoverLink } = props;

  const updateCoverPicture = async (f) => {
    const stroageRef = SRef(storage, `/coverImages/${f.name}`);
    const uploadTask = uploadBytesResumable(stroageRef, f);
    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      setCoverLink(downloadURL);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CoverSectionWrapper>
      <CoverSection>
        <CardMedia>
          <CoverImage src={coverLink} alt="" />
        </CardMedia>
      </CoverSection>
      <UploadSection>

        <UploadButton
          htmlFor="cover-upload-img"
          className="sc-button loadmore fl-button pri-3"
        >
          <span>Upload New Photo</span>
        </UploadButton>

        <FileInput
          id="cover-upload-img"
          type="file"
          name="profile"
          accept="image/*"
          required=""
          onChange={(e) => updateCoverPicture(e.target.files[0])}
        />

      </UploadSection>
    </CoverSectionWrapper>
  );
});

CoverImageSection.propTypes = {
  coverLink: PropTypes.string,
  setCoverLink: PropTypes.func,
};

CoverImageSection.defaultProps = {
  coverLink: '',
  setCoverLink: () => { },
};

export default CoverImageSection;
