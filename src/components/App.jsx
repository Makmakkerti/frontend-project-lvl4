import React from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import faker from 'faker';
import Channels from './Channels';
import Messages from './Messages';
import getModal from './Modals/index';
import UserNameContext from '../app-context';

if (!Cookies.get('username')) {
  const fakeName = faker.fake('{{name.firstName}}_{{name.lastName}}');
  Cookies.set('username', fakeName);
}

const username = Cookies.get('username');

const App = () => {
  const modalState = useSelector((state) => state.modalState);
  const ModalComponent = getModal(modalState.type);

  return (
    <UserNameContext.Provider value={username}>
      <div className="row h-100 pb-3">
        <Channels />
        <Messages />
        {modalState.type && <ModalComponent />}
      </div>
    </UserNameContext.Provider>
  );
};

export default App;
