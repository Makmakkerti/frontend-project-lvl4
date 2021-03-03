import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeModal } from '../../store/modal';

const ModalWrapper = ({ children, title }) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState);
  const handleClose = useCallback(() => dispatch(closeModal()), [dispatch]);

  return (
    <Modal show={modalState.opened} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWrapper;
