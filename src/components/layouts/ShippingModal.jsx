import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ShippingModal(props) {
  const { onHide: propsOnHide, show: propsShow } = props;
  return (
    <Modal
      show={propsShow}
      onHide={propsOnHide}
    >
      <Modal.Header closeButton />
      <div className="modal-body space-y-20 pd-40">
        <h3>Estimated shipping cost:</h3>
        <p className="text-center ">
          Collectors have the option to not receive the physical artwork, in this case,
          the artwork is kept in the artist’s hand for the primary sales market or on specialized art storages for
          the secondary sales market, the artworks still owned by the collectors and can ask for
          shipping whenever he wants
        </p>

      </div>
    </Modal>

  );
}

ShippingModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

ShippingModal.defaultProps = {
  onHide: () => {},
  show: false,
};

export default ShippingModal;
