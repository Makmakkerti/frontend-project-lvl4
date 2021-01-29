import React from 'react';
import Cookies from 'js-cookie';
import faker from 'faker';
import Channels from './Channels';
import Messages from './Messages';

if (!Cookies.get('username')) {
  const fakeName = faker.fake('{{name.firstName}}_{{name.lastName}}');
  Cookies.set('username', fakeName);
}

const username = Cookies.get('username');

const App = ({ data }) => (
  <div className="row h-100 pb-3">
    <Channels data={data} />
    <Messages data={data} username={username} />
  </div>
);

export default App;
