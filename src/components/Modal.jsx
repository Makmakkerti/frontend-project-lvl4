import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
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
  dispatch(closeModal());
};

const handleAddSubmit = (dispatch) => () => {
  const createChannelUrl = '/api/v1/channels';
  const name = 'NewChannel3';

  const messageData = {
    data: {
      attributes: {
        name,
      },
    },
  };

  axios.post(createChannelUrl, messageData)
    .then(({ data }) => {
      const { attributes } = data.data;
      console.log(attributes);
    })
    .catch((error) => {
      console.log(error);
    });

  dispatch(closeModal());
};

const MyModal = (props) => {
  const { modalState, dispatch } = props;

  return (
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
            <Button variant="primary" onClick={handleAddSubmit(dispatch, modalState)}>
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps)(MyModal);
