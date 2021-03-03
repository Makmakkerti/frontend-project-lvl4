import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import i18next from 'i18next';
import {
  Button, Form,
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper';
import { closeModal } from '../../store/modal';
import { selectChannel } from '../../store/currentChannel';
import routes from '../../routes';

const Add = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const channels = useSelector((state) => state.channels);
  const channelNames = channels.map((ch) => ch.name);
  const inputRef = useRef();
  const setFocus = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  // AutoFocus Modal Input
  useEffect(() => setFocus());

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
            name: values.body.trim(),
          },
        },
      };

      try {
        const { data } = await axios.post(routes.channelsPath(), messageData);
        dispatch(closeModal());
        dispatch(selectChannel({ currentChannelId: data.data.attributes.id }));
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <ModalWrapper title={i18next.t('titles.add')}>
      <Form noValidate="" onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formChannelName">
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
            <Button variant="primary" type="submit">
              {i18next.t('buttons.submit')}
            </Button>
          </div>
        </Form.Group>
      </Form>
    </ModalWrapper>
  );
};

export default Add;
