import React from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { closeModal } from '../store/modal';

const mapStateToProps = (state) => {
  const props = {
    modalState: state.modalState,
  };
  return props;
};

const handleClose = (dispatch) => () => {
  console.log('Closed!!!');
  dispatch(closeModal());
};

const handleSubmit = (dispatch, state) => () => {
  console.log('Submitted!!!', state);
  dispatch(closeModal());
};

const MyModal = ({ modalState, dispatch }) => (
  <>
    <Modal show={modalState.opened} onHide={handleClose(dispatch)}>
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
          <Button variant="primary" onClick={handleSubmit(dispatch, modalState)}>
            Submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  </>
);

export default connect(mapStateToProps)(MyModal);
