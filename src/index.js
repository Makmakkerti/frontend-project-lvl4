import gon from 'gon';
import runApp from './Init';

const { channels, currentChannelId, messages } = gon;
const preloadedState = {
  channels: {
    channels,
    currentChannelId,
  },
  messages,
};

runApp(preloadedState);
