import React from 'react';
import { connect } from 'react-redux';
import InputForm from './InputForm';

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
  messages: state.messages,
});

const Messages = ({ currentChannelId, messages }) => {
  const channelMessages = messages.filter((m) => m.channelId === currentChannelId);

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

export default connect(mapStateToProps)(Messages);
