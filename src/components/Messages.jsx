/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import axios from 'axios';

const Messages = ({ username, data }) => {
  const { currentChannelId, messages } = data;
  const channelMessages = messages.filter((m) => m.channelId === currentChannelId);

  const handleAddMessage = (e) => {
    e.preventDefault();
    const input = e.target.elements.body;
    const message = input.value;

    const currentChannelMessagesUrl = `http://localhost:5000/api/v1/channels/${currentChannelId}/messages`;
    const messageData = {
      data: {
        attributes: {
          body: message,
          channelId: currentChannelId,
          nickname: username,
        },
      },
    };

    axios.post(currentChannelMessagesUrl, messageData)
      .then((response) => {
        input.value = '';
        console.log(response, data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {channelMessages.map((m) => (
            <div className="text-break" key={m.id}>
              <b>{m.nickname}</b>
              : {m.body}
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <form noValidate className="" onSubmit={handleAddMessage}>
            <div className="form-group">
              <div className="input-group">
                <input name="body" aria-label="body" className="mr-2 form-control" />
                <button
                  aria-label="submit"
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
                <div className="d-block invalid-feedback">&nbsp;</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
