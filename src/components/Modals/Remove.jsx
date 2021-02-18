import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import i18next from 'i18next';
import { closeModal } from '../../store/modal';
import { selectChannel } from '../../store/currentChannel';
import routes from '../../routes';

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
    axios.delete(routes.channelPath(currentChannelId))
      .then(() => {
        dispatch(selectChannel({ currentChannelId: 1 }));
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(closeModal());
  };

  return (
    <Modal show={modalState.opened} onHide={handleClose(dispatch)}>
      <Modal.Header closeButton>
        <Modal.Title>{i18next.t('titles.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {i18next.t('confirmQuestion')}
        <div className="d-flex justify-content-between">
          <button type="button" className="mr-2 btn btn-secondary" onClick={handleClose(dispatch)}>{i18next.t('buttons.cancel')}</button>
          <button type="button" className="btn btn-danger" onClick={handleRemove}>{i18next.t('buttons.submit')}</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps)(Remove);
