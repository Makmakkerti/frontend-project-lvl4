/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */

// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/application.scss';
// @ts-ignore
import gon from 'gon';
import App from './components/App';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(<App data={gon} />, document.querySelector('#chat'));
console.log(gon);
