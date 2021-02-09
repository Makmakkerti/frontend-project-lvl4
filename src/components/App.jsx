/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import faker from 'faker';
import Channels from './Channels';
import Messages from './Messages';
import getModal from './Modals/index';

if (!Cookies.get('username')) {
  const fakeName = faker.fake('{{name.firstName}}_{{name.lastName}}');
  Cookies.set('username', fakeName);
}

const username = Cookies.get('username');

const mapStateToProps = (state) => ({
  modalState: state.modalState,
});

const App = ({ modalState }) => {
  const ModalComponent = getModal(modalState.type);

  return (
    <div className="row h-100 pb-3">
      <Channels />
      <Messages username={username} />
      { modalState.type && <ModalComponent />}
    </div>
  );
};

export default connect(mapStateToProps)(App);
