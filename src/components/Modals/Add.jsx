import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button, Form,
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper';
import { closeModal } from '../../store/modal';
import { actions as channelActions } from '../../store/channels';
import routes from '../../routes';

const Add = ({ i18next }) => {
  const dispatch = useDispatch();
  const networkState = useSelector((state) => state.networkState);
  const channels = useSelector((state) => state.channels);

  const handleClose = () => dispatch(closeModal());
  const channelNames = channels.map((ch) => ch.name);
  const inputRef = useRef();
  const setFocus = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  // AutoFocus Modal Input
  useEffect(() => setFocus(), []);

  const channelNameSchema = Yup.object().shape({
    body: Yup.string().trim()
      .required(i18next.t('errors.required'))
      .min(3, i18next.t('errors.invalidLength'))
      .notOneOf(channelNames, i18next.t('errors.sameName'))
      .max(50, i18next.t('errors.invalidLength')),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: channelNameSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const messageData = {
        data: {
          attributes: {
            name: values.body,
          },
        },
      };

      try {
        const { data } = await axios.post(routes.channelsPath(), messageData);
        dispatch(closeModal());
        dispatch(channelActions.setActive({ id: data.data.attributes.id }));
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ModalWrapper title={i18next.t('titles.add')}>
      <Form noValidate="" onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formChannelName">
          {networkState.error && <div className="d-block invalid-feedback">{i18next.t('errors.network')}</div>}
          <Form.Control
            type="text"
            name="body"
            className="mb-2 form-control"
            value={formik.values.body}
            onChange={formik.handleChange}
            ref={inputRef}
          />
          {formik.errors.body && <div className="d-block invalid-feedback">{formik.errors.body}</div>}

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="mr-2" onClick={handleClose}>
              {i18next.t('buttons.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={networkState.error}>
              {i18next.t('buttons.submit')}
            </Button>
          </div>
        </Form.Group>
      </Form>
    </ModalWrapper>
  );
};

export default Add;
