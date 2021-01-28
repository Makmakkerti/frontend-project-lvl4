import React from 'react';
import Channels from './Channels';
import Messages from './Messages';

const App = ({ data }) => (
  <div className="row h-100 pb-3">
    <Channels data={data} />
    <Messages />
  </div>
);

export default App;
