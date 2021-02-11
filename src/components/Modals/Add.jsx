import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import i18next from 'i18next';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { closeModal } from '../../store/modal';
import routes from '../../routes';

const mapStateToProps = (state) => ({
  modalState: state.modalState,
});

const handleClose = (dispatch) => () => {
  dispatch(closeModal());
};

const Add = (props) => {
  const { modalState, dispatch } = props;

  const channelNameSchema = Yup.object().shape({
    body: Yup.string().trim()
      .required(i18next.t('errors.required'))
      .min(3, i18next.t('errors.invalidLength'))
      .max(50, i18next.t('errors.invalidLength')),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: channelNameSchema,
    onSubmit: (values) => {
      const messageData = {
        data: {
          attributes: {
            name: values.body.trim(),
          },
        },
      };

      axios.post(routes.channelsPath(), messageData)
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
          <Modal.Title>{i18next.t('titles.add')}</Modal.Title>
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

export default connect(mapStateToProps)(Add);
