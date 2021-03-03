import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import i18next from 'i18next';
import ModalWrapper from './ModalWrapper';
import { closeModal } from '../../store/modal';
import { selectChannel } from '../../store/currentChannel';
import routes from '../../routes';

const Remove = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const handleClose = useCallback(() => dispatch(closeModal()), [dispatch]);
  const GeneralChannelId = 1;

  const handleRemove = async () => {
    try {
      await axios.delete(routes.channelPath(currentChannelId));
      dispatch(selectChannel({ currentChannelId: GeneralChannelId }));
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalWrapper title={i18next.t('titles.remove')}>
      {i18next.t('confirmQuestion')}
      <div className="d-flex justify-content-between">
        <button type="button" className="mr-2 btn btn-secondary" onClick={handleClose}>{i18next.t('buttons.cancel')}</button>
        <button type="button" className="btn btn-danger" onClick={handleRemove}>{i18next.t('buttons.submit')}</button>
      </div>
    </ModalWrapper>
  );
};

export default Remove;
