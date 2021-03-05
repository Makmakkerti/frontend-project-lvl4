import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import InputForm from './InputForm';

const Messages = ({ i18next }) => {
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const channelMessages = useSelector((state) => state.messages
    .filter((m) => m.channelId === currentChannelId));
  const chatContainer = React.createRef();

  const scrollToNewMessage = () => {
    const { current } = chatContainer;
    const diff = current.scrollHeight - current.clientHeight;
    if (diff > 0) {
      current.scrollTo(0, diff, 'smooth');
    }
  };

  useEffect(() => {
    scrollToNewMessage();
  });

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" ref={chatContainer} className="chat-messages overflow-auto mb-3">
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
          <InputForm i18next={i18next} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
