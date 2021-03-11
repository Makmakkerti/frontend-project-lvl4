import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ModalWrapper from './ModalWrapper';
import { I18nContext } from '../../app-context';
import { closeModal } from '../../store/modal';
import { actions as channelActions } from '../../store/channels';
import routes from '../../routes';

const Remove = () => {
  const dispatch = useDispatch();
  const i18next = useContext(I18nContext);
  const { currentChannelId } = useSelector((state) => state.channels);
  const handleClose = () => dispatch(closeModal());
  const GeneralChannelId = 1;
  const networkState = useSelector((state) => state.networkState);

  const handleRemove = async () => {
    try {
      await axios.delete(routes.channelPath(currentChannelId));
      dispatch(channelActions.selectChannel({ currentChannelId: GeneralChannelId }));
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalWrapper title={i18next.t('titles.remove')}>
      {networkState.error && <div className="d-block invalid-feedback">{i18next.t('errors.network')}</div>}
      {i18next.t('confirmQuestion')}
      <div className="d-flex justify-content-between">
        <button type="button" className="mr-2 btn btn-secondary" onClick={handleClose}>{i18next.t('buttons.cancel')}</button>
        <button type="button" className="btn btn-danger" disabled={networkState.error} onClick={handleRemove}>{i18next.t('buttons.submit')}</button>
      </div>
    </ModalWrapper>
  );
};

export default Remove;
