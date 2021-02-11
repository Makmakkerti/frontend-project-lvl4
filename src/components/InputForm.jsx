import React, { useContext } from 'react';
import axios from 'axios';
import cn from 'classnames';
import i18next from 'i18next';
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
        console.log(error);
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

  const inputClasses = cn(
    'mr-2',
    'form-control',
    {
      'is-invalid': networkState.error,
    },
  );

  return (
    <form noValidate className="" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <div className="input-group">
          <input name="body" aria-label="body" disabled={networkState.sending} className={inputClasses} value={formik.values.body} onChange={formik.handleChange} />
          <button
            aria-label="submit"
            type="submit"
            className="btn btn-primary"
            disabled={networkState.sending}
          >
            {i18next.t('buttons.submit')}
          </button>
          {networkState.error && <div className="d-block invalid-feedback">{i18next('errors.network')}</div>}
        </div>
      </div>
    </form>
  );
};

export default connect(mapStateToProps)(InputForm);
