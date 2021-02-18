/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import React from 'react';
import Rollbar from 'rollbar';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import faker from 'faker';
import Channels from './Channels';
import Messages from './Messages';
import getModal from './Modals/index';
import UserNameContext from '../app-context';

// eslint-disable-next-line no-underscore-dangle
const rollbar = new Rollbar({
  accessToken: '94533ecfb7424adfbe31859f9b68dfb6',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
});

rollbar.log('Hello from Chat');

if (!Cookies.get('username')) {
  const fakeName = faker.fake('{{name.firstName}}_{{name.lastName}}');
  Cookies.set('username', fakeName);
}

const username = Cookies.get('username');

const App = () => {
  const modalState = useSelector((state) => state.modalState);
  const ModalComponent = getModal(modalState.type);

  return (
    <div className="row h-100 pb-3">
      <Channels />
      <UserNameContext.Provider value={username}>
        <Messages />
      </UserNameContext.Provider>
      { modalState.type && <ModalComponent />}
    </div>
  );
};

export default App;
