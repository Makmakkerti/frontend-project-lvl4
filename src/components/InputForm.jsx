import React, { useRef, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { UserNameContext, I18nContext } from '../app-context';
import { actions as networkActions } from '../store/network';
import routes from '../routes';

const InputForm = () => {
  const i18next = useContext(I18nContext);
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const networkState = useSelector((state) => state.networkState);
  const nickname = useContext(UserNameContext);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const setInputFocus = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => setInputFocus(), [currentChannelId]);

  const messageSchema = Yup.object().shape({
    body: Yup.string().trim()
      .required(i18next.t('errors.required')),
  });

  const handleAddMessage = async (body, resetForm) => {
    const messageData = {
      data: {
        attributes: {
          body,
          channelId: currentChannelId,
          nickname,
        },
      },
    };

    try {
      await axios.post(routes.channelMessagesPath(currentChannelId), messageData);
      dispatch(networkActions.setDefaults());
      resetForm();
    } catch (error) {
      dispatch(networkActions.setError());
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: messageSchema,
    onSubmit: async (values, { resetForm }) => {
      await handleAddMessage(values.body, resetForm);
      setInputFocus();
    },
  });

  const inputClasses = cn(
    'mr-2',
    'form-control',
    {
      'is-invalid': networkState.error || formik.errors.body,
    },
  );

  return (
    <form noValidate className="" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <div className="input-group">
          <input name="body" aria-label="body" ref={inputRef} disabled={formik.isSubmitting} className={inputClasses} value={formik.values.body} onChange={formik.handleChange} />
          <button
            aria-label="submit"
            type="submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting || !formik.values.body.length}
          >
            {i18next.t('buttons.submit')}
          </button>
          {networkState.error && <div className="d-block invalid-feedback">{i18next.t('errors.network')}</div>}
        </div>
      </div>
    </form>
  );
};

export default InputForm;
