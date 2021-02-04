/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import faker from 'faker';
import Channels from './Channels';
import Messages from './Messages';

if (!Cookies.get('username')) {
  const fakeName = faker.fake('{{name.firstName}}_{{name.lastName}}');
  Cookies.set('username', fakeName);
}

const username = Cookies.get('username');

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
    channels: state.channels,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

const App = (props) => (
  <div className="row h-100 pb-3">
    <Channels data={props} />
    <Messages data={props} username={username} />
  </div>
);

export default connect(mapStateToProps)(App);
