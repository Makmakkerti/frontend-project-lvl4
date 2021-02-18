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

// @ts-ignore
import gon from 'gon';
import en from './locales/en';
import App from './components/App';
import reducer from './store/rootReducer';
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
