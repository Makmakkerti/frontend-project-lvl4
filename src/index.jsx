// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import socket from 'io';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import { configureStore } from '@reduxjs/toolkit';
import i18next from 'i18next';

import en from './locales/en';
import App from './components/App';
import reducer from './store/rootReducer';
import { messageAdded, messagesRemoved } from './store/messages';
import { channelAdded, channelRemoved, channelRenamed } from './store/channels';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const store = configureStore({ reducer });

socket.on('newMessage', (msg) => {
  store.dispatch(messageAdded({ attributes: msg.data.attributes }));
});

socket.on('newChannel', (msg) => {
  store.dispatch(channelAdded({ attributes: msg.data.attributes }));
});

socket.on('renameChannel', (msg) => {
  store.dispatch(channelRenamed({ attributes: msg.data.attributes }));
});

socket.on('removeChannel', (msg) => {
  store.dispatch(channelRemoved({ id: msg.data.id }));
  store.dispatch(messagesRemoved({ id: msg.data.id }));
});

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

i18next.init({
  lng: 'en',
  debug: false,
  resources: {
    en,
  },
}).then(() => {
  ReactDOM.render(jsx, document.querySelector('#chat'));
});
