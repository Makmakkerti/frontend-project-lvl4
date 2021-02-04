import React from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { closeModal } from '../store/modal';

const mapStateToProps = (state) => {
  const props = {
    showModal: state.showModal,
  };
  return props;
};

const handleClose = (dispatch) => () => {
  console.log('Closed!!!');
  dispatch(closeModal());
};

const handleSubmit = (dispatch) => () => {
  console.log('Submitted!!!');
  dispatch(closeModal());
};

const MyModal = ({ showModal, dispatch }) => (
  <>
    <Modal show={showModal} onHide={handleClose(dispatch)}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formChannelName">
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="mr-2" onClick={handleClose(dispatch)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit(dispatch)}>
            Submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  </>
);

export default connect(mapStateToProps)(MyModal);
