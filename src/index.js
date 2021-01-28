/* eslint-disable react/jsx-filename-extension */

// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/application.scss';

// @ts-ignore
import gon from 'gon';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const App = () => {
  const { channels, currentChannelId } = gon;
  return (
    <div>
      <h3>Channels:</h3>
      <ul>
        {channels.map((c) => {
          if (currentChannelId === c.id) return (<li key={c.id}><b>{c.name}</b></li>);
          return (<li key={c.id}>{c.name}</li>);
        })}
      </ul>
    </div>
  );
};

const container = document.querySelector('#chat');
ReactDOM.render(<App />, container);

console.log('gon', gon);
