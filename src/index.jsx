// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import { configureStore } from '@reduxjs/toolkit';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import socket from 'io';
import App from './components/App';
import reducer from './store/rootReducer';
import { messageAdded } from './store/messages';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const store = configureStore({ reducer });

socket.on('newMessage', (msg) => {
  store.dispatch(messageAdded({ attributes: msg.data.attributes }));
});

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.querySelector('#chat'));
