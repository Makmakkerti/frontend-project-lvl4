import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import i18next from 'i18next';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { closeModal } from '../../store/modal';
import routes from '../../routes';

const mapStateToProps = (state) => ({
  modalState: state.modalState,
  currentChannelId: state.currentChannelId,
  channels: state.channels,
});

const handleClose = (dispatch) => () => {
  dispatch(closeModal());
};

const Rename = (props) => {
  const {
    modalState, channels, currentChannelId, dispatch,
  } = props;
  const currentChannel = channels.find((channel) => currentChannelId === channel.id);
  const modalInputRef = React.createRef();

  // AutoFocus Modal Input
  useEffect(() => {
    modalInputRef.current.focus();
  });

  // AutoSelect Modal Input
  useEffect(
    () => {
      modalInputRef.current.select();
    },
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
    <>
      <Modal show={modalState.opened} onHide={handleClose(dispatch)}>
        <Modal.Header closeButton>
          <Modal.Title>{i18next.t('titles.rename')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <Button variant="secondary" className="mr-2" onClick={handleClose(dispatch)}>
                  {i18next.t('buttons.cancel')}
                </Button>
                <Button variant="primary" type="submit">
                  {i18next.t('buttons.submit')}
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps)(Rename);
