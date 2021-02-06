import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
});

const InputForm = ({ currentChannelId, username }) => {
  const handleAddMessage = (e) => {
    e.preventDefault();
    const input = e.target.elements.body;
    const message = input.value;

    const currentChannelMessagesUrl = `/api/v1/channels/${currentChannelId}/messages`;
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
      .then(() => {
        input.value = '';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
  );
};

export default connect(mapStateToProps)(InputForm);
