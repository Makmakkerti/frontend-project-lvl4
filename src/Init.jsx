import 'core-js/stable';
import 'regenerator-runtime/runtime';
import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import Rollbar from 'rollbar';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import { configureStore } from '@reduxjs/toolkit';
import preloadedState from 'gon';
import en from './locales/en';
import App from './components/App';
import reducer from './store';
import { actions as messageActions } from './store/messages';
import { actions as channelActions } from './store/channels';
import { actions as networkActions } from './store/network';

export default async () => {
  await i18next.init({
    lng: 'en',
    resources: {
      en,
    },
  });

  const socket = io({
    timeout: 1000,
  });

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
    store.dispatch(channelActions.removeChannel({ id: msg.data.id }));
    store.dispatch(messageActions.removeChannelMessages({ id: msg.data.id }));
  });

  socket.on('connect', () => {
    store.dispatch(networkActions.setDefaults());
  });

  socket.on('disconnect', () => {
    store.dispatch(networkActions.setError());
  });

  const rollbar = new Rollbar({
    accessToken: '94533ecfb7424adfbe31859f9b68dfb6',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });

  rollbar.log('Hello from Chat');

  const Init = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

  ReactDOM.render(<Init />, document.querySelector('#chat'));
};
