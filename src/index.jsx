// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/application.scss';
import { configureStore } from '@reduxjs/toolkit';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import socket from 'io';
import App from './components/App';
import reducer from './store/rootReducer';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

socket.on('newMessage', (msg) => {
  console.log(msg);
});

const appState = configureStore({
  reducer,
});

ReactDOM.render(<App state={appState} />, document.querySelector('#chat'));
