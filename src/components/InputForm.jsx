import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import * as Yup from 'yup';
import i18next from 'i18next';
import { useFormik } from 'formik';
import UserNameContext from '../app-context';
import { actions as networkActions } from '../store/network';
import routes from '../routes';

const InputForm = () => {
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const networkState = useSelector((state) => state.networkState);
  const nickname = useContext(UserNameContext);
  const dispatch = useDispatch();

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
          <input name="body" aria-label="body" disabled={formik.isSubmitting} className={inputClasses} value={formik.values.body} onChange={formik.handleChange} />
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
