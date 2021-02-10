import React, { useContext } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import UserNameContext from '../app-context';
import { networkDefaults, networkError, networkSending } from '../store/network';

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
  networkState: state.networkState,
});

const InputForm = ({ currentChannelId, networkState, dispatch }) => {
  const nickname = useContext(UserNameContext);

  const handleAddMessage = (body, resetForm) => {
    const messageData = {
      data: {
        attributes: {
          body,
          channelId: currentChannelId,
          nickname,
        },
      },
    };

    dispatch(networkSending());

    axios.post(`/api/v1/channels/${currentChannelId}/messages`, messageData)
      .then(() => {
        dispatch(networkDefaults());
        resetForm();
      })
      .catch((error) => {
        dispatch(networkError());
        console.log('Network Error:: ', error);
      });
  };

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: (values, { resetForm }) => {
      // Prevent sending empty message
      if (!values.body.length) return;
      handleAddMessage(values.body, resetForm);
    },
  });

  return (
    <form noValidate className="" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <div className="input-group">
          <input name="body" aria-label="body" disabled={networkState.sending} className="mr-2 form-control" value={formik.values.body} onChange={formik.handleChange} />
          <button
            aria-label="submit"
            type="submit"
            className="btn btn-primary"
            disabled={networkState.sending}
          >
            Submit
          </button>
          {networkState.error && <div className="d-block invalid-feedback">Network Error&nbsp;</div>}
        </div>
      </div>
    </form>
  );
};

export default connect(mapStateToProps)(InputForm);
