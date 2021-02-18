// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import socket from 'io';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import { configureStore } from '@reduxjs/toolkit';

// @ts-ignore
import gon from 'gon';

import App from './components/App';
import reducer from './store';
import { actions as messageActions } from './store/messages';
import { actions as channelActions } from './store/channels';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const store = configureStore({
  reducer,
  preloadedState: gon,
});

socket.on('newMessage', (msg) => {
  store.dispatch(messageActions.addMessage({ attributes: msg.data.attributes }));
});

socket.on('newChannel', (msg) => {
  store.dispatch(channelActions.addChannel({ attributes: msg.data.attributes }));
});

socket.on('renameChannel', (msg) => {
  store.dispatch(channelActions.renameChannel({ attributes: msg.data.attributes }));
});

socket.on('removeChannel', (msg) => {
  store.dispatch(channelActions.removeChannel({ id: msg.data.id }));
  store.dispatch(messageActions.removeChannelMessages({ id: msg.data.id }));
});

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
