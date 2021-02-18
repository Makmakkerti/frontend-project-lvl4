import React, { useEffect, useRef, useCallback } from 'react';
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
import routes from '../../routes';

const Rename = () => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const channels = useSelector((state) => state.channels);
  const currentChannel = channels.find((channel) => currentChannelId === channel.id);
  const modalInputRef = useRef();
  const handleClose = useCallback(() => dispatch(closeModal()), [dispatch]);

  // AutoFocus Modal Input
  useEffect(() => modalInputRef.current.focus());

  // AutoSelect Modal Input
  useEffect(
    () => modalInputRef.current.select(),
    [currentChannel.name],
  );

  const channelNameSchema = Yup.object().shape({
    body: Yup.string().trim()
      .required(i18next.t('errors.required'))
      .min(3, i18next.t('errors.invalidLength'))
      .max(50, i18next.t('errors.invalidLength')),
  });

  const formik = useFormik({
    initialValues: { body: currentChannel.name },
    validationSchema: channelNameSchema,
    onSubmit: (values) => {
      const messageData = {
        data: {
          attributes: {
            name: values.body.trim(),
          },
        },
      };

      axios.patch(routes.channelPath(currentChannelId), messageData)
        .then(({ data }) => {
          const { attributes } = data.data;
          console.log(attributes);
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch(closeModal());
    },
  });

  return (
    <ModalWrapper title={i18next.t('titles.rename')}>
      <Form noValidate="" onSubmit={formik.handleSubmit}>
        <Form.Group controlId="formChannelName">
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
            <Button variant="primary" type="submit">
              {i18next.t('buttons.submit')}
            </Button>
          </div>
        </Form.Group>
      </Form>
    </ModalWrapper>
  );
};

export default Rename;
