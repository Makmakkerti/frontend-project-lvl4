import 'core-js/stable';
import 'regenerator-runtime/runtime';

import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import Rollbar from 'rollbar';
import IO from 'socket.io-client';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import { configureStore } from '@reduxjs/toolkit';
import gon from 'gon';
import en from './locales/en';
import App from './components/App';
import reducer from './store';
import { actions as messageActions } from './store/messages';
import { actions as channelActions } from './store/channels';
import { actions as networkActions } from './store/network';

export default async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'en',
    resources: {
      en,
    },
  });

  const socket = new IO({
    timeout: 1000,
  });

  const channels = gon.channels.map((ch) => {
    // eslint-disable-next-line no-param-reassign
    ch.active = ch.id === gon.currentChannelId;
    return ch;
  });

  const { messages } = gon;

  const preloadedState = { messages, channels };

  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const store = configureStore({
    reducer,
    preloadedState,
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
    store.dispatch(channelActions.setActive({ id: 1 }));
    store.dispatch(channelActions.removeChannel({ id: msg.data.id }));
  });

  socket.on('connect', () => {
    store.dispatch(networkActions.setDefaults());
  });

  socket.on('disconnect', () => {
    store.dispatch(networkActions.setError());
  });

  const accessToken = process.env.ROLLBAR_KEY;

  const rollbar = new Rollbar({
    accessToken,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });

  rollbar.log('Hello from Chat');

  const Init = () => (
    <Provider store={store}>
      <App i18next={i18nextInstance} />
    </Provider>
  );

  ReactDOM.render(<Init />, document.querySelector('#chat'));
};
