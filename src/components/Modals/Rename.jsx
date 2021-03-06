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
import routes from '../../routes';

const Rename = ({ i18next }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const channelNames = channels.map((ch) => ch.name);
  const currentChannel = channels.find((channel) => channel.active);
  const networkState = useSelector((state) => state.networkState);

  const modalInputRef = useRef();
  const handleClose = () => dispatch(closeModal());

  // AutoFocus Modal Input
  useEffect(() => modalInputRef.current.focus(), []);
  // AutoSelect Modal Input
  useEffect(() => modalInputRef.current.select(), []);

  const channelNameSchema = Yup.object().shape({
    body: Yup.string().trim()
      .required(i18next.t('errors.required'))
      .notOneOf(channelNames, i18next.t('errors.sameName'))
      .min(3, i18next.t('errors.invalidLength'))
      .max(50, i18next.t('errors.invalidLength')),
  });

  const formik = useFormik({
    initialValues: { body: currentChannel.name },
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
        await axios.patch(routes.channelPath(currentChannel.id), messageData);
        dispatch(closeModal());
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ModalWrapper title={i18next.t('titles.rename')}>
      <Form noValidate="" onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formChannelName">
          {networkState.error && <div className="d-block invalid-feedback">{i18next.t('errors.network')}</div>}
          <Form.Control
            type="text"
            name="body"
            className="mb-2 form-control"
            value={formik.values.body}
            onChange={formik.handleChange}
            ref={modalInputRef}
          />
          {formik.errors.body && <div className="d-block invalid-feedback">{formik.errors.body}</div>}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="mr-2" onClick={handleClose}>
              {i18next.t('buttons.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={networkState.error || formik.isSubmitting}>
              {i18next.t('buttons.submit')}
            </Button>
          </div>
        </Form.Group>
      </Form>
    </ModalWrapper>
  );
};

export default Rename;
