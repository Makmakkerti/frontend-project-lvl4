import { combineReducers } from '@reduxjs/toolkit';
import channels from './channels';
import messages from './messages';
import currentChannelId from './currentChannel';

export default combineReducers({
  channels,
  messages,
  currentChannelId,
});
