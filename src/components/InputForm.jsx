import React, { useContext } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import UserNameContext from '../app-context';

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
});

const handleAddMessage = (props, body, nickname) => {
  const messageData = {
    data: {
      attributes: {
        body,
        channelId: props.currentChannelId,
        nickname,
      },
    },
  };

  axios.post(`/api/v1/channels/${props.currentChannelId}/messages`, messageData)
    .then()
    .catch((error) => {
      console.log(error);
    });
};

const InputForm = (props) => {
  const nickname = useContext(UserNameContext);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: (values, { resetForm }) => {
      // Prevent sending empty message
      if (!values.body.length) return;

      handleAddMessage(props, values.body, nickname);
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
