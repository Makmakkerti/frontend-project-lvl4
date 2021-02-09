import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { closeModal } from '../../store/modal';

const mapStateToProps = (state) => ({
  modalState: state.modalState,
  currentChannelId: state.currentChannelId,
});

const handleClose = (dispatch) => () => {
  dispatch(closeModal());
};

const Remove = (props) => {
  const {
    modalState, currentChannelId, dispatch,
  } = props;

  const handleRemove = () => {
    axios.delete(`/api/v1/channels/${currentChannelId}`)
      .then((resp) => {
        const { data } = resp;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(closeModal());
  };

  return (
    <>
      <Modal show={modalState.opened} onHide={handleClose(dispatch)}>
        <Modal.Header closeButton>
          <Modal.Title>Remove channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure?
          <div className="d-flex justify-content-between">
            <button type="button" className="mr-2 btn btn-secondary" onClick={handleClose(dispatch)}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={handleRemove}>Confirm</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps)(Remove);
