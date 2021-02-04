/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import faker from 'faker';
import Channels from './Channels';
import Messages from './Messages';
import Modal from './Modal';

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
    showModal: state.modal,
  };
  return props;
};

const App = (props) => (
  <div className="row h-100 pb-3">
    <Channels />
    <Messages data={props} username={username} />
    <Modal />
  </div>
);

export default connect(mapStateToProps)(App);
