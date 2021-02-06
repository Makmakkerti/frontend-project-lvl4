import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useFormik } from 'formik';

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
});

const handleAddMessage = (props, body) => {
  const currentChannelMessagesUrl = `/api/v1/channels/${props.currentChannelId}/messages`;
  const messageData = {
    data: {
      attributes: {
        body,
        channelId: props.currentChannelId,
        nickname: props.username,
      },
    },
  };

  axios.post(currentChannelMessagesUrl, messageData)
    .then()
    .catch((error) => {
      console.log(error);
    });
};

const InputForm = (props) => {
  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: (values, { resetForm }) => {
      handleAddMessage(props, values.body);
      resetForm({ values: '' });
    },
  });

  return (
    <form noValidate className="" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <div className="input-group">
          <input name="body" aria-label="body" className="mr-2 form-control" value={formik.values.body} onChange={formik.handleChange} />
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
