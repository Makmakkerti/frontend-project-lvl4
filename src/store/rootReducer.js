import { combineReducers } from '@reduxjs/toolkit';
import channels from './channels';
import messages from './messages';
import currentChannelId from './currentChannel';
import showModal from './modal';

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  showModal,
});
