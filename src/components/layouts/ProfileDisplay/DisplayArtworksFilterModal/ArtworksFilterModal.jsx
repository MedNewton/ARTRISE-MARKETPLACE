import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import RenderCloseFilterModalIcon from './RenderCloseFilterModalIcon';
import { ArtworksFilterModalWrapper, FilterTitleCloseIconWrapper } from './ArtworksFilterModal.style';

function ArtworksFilterModal(props) {
  const {
    showFilterModal,
    handleFilterModalClose,
    filterOptions,
    filterState,
    handleOptionChange,
  } = props;

  return (
    <Modal
      show={showFilterModal}
      onHide={() => handleFilterModalClose()}
      dialogClassName="full-screen-modal"
    >
      <ArtworksFilterModalWrapper>
        <FilterTitleCloseIconWrapper>
          <h3>Filter</h3>
          <RenderCloseFilterModalIcon handleFilterModalClose={handleFilterModalClose} />
        </FilterTitleCloseIconWrapper>
        {Object.keys(filterOptions).map((section) => (
          <div className="filter-section" key={section}>
            <h3>{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
            <div className="divider" />
            {filterOptions[section].map((option) => (
              <label
                className="filter-option"
                key={option.id}
                htmlFor={`filter-${section}-${option.id}`}
              >
                <input
                  id={`filter-${section}-${option.id}`}
                  className="filter-checkbox-input"
                  type="checkbox"
                  style={{ color: 'black' }}
                  checked={filterState[section][option.id] || false}
                  onChange={() => handleOptionChange(section, option.id)}
                />
                {option.label}
              </label>
            ))}
          </div>
        ))}
      </ArtworksFilterModalWrapper>
    </Modal>
  );
}

const filterOptionShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

const filterStateShape = PropTypes.shape({
  categories: PropTypes.objectOf(PropTypes.bool).isRequired,
  fileTypes: PropTypes.objectOf(PropTypes.bool).isRequired,
  currencies: PropTypes.objectOf(PropTypes.bool).isRequired,
});

ArtworksFilterModal.propTypes = {
  showFilterModal: PropTypes.bool.isRequired,
  handleFilterModalClose: PropTypes.func.isRequired,
  filterOptions: PropTypes.shape({
    categories: PropTypes.arrayOf(filterOptionShape).isRequired,
    fileTypes: PropTypes.arrayOf(filterOptionShape).isRequired,
    currencies: PropTypes.arrayOf(filterOptionShape).isRequired,
  }).isRequired,
  filterState: filterStateShape.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
};

export default ArtworksFilterModal;
