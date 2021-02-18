import React from 'react';
import { useSelector } from 'react-redux';
import InputForm from './InputForm';

const Messages = () => {
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const channelMessages = useSelector((state) => state.messages
    .filter((m) => m.channelId === currentChannelId));

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {channelMessages.map((m) => (
            <div className="text-break" key={m.id}>
              <b>{m.nickname}</b>
              :
              {' '}
              {m.body}
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <InputForm />
        </div>
      </div>
    </div>
  );
};

export default Messages;
