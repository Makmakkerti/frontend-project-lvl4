import { combineReducers } from '@reduxjs/toolkit';
import channels from './channels';
import messages from './messages';
import currentChannelId from './currentChannel';
import modalState from './modal';
import networkState from './network';

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  modalState,
  networkState,
});
