import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { closeModal } from '../../store/modal';

const mapStateToProps = (state) => {
  const props = {
    modalState: state.modalState,
  };
  return props;
};

const handleClose = (dispatch) => () => {
  dispatch(closeModal());
};

const MyModal = (props) => {
  const { modalState, dispatch } = props;

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: (values) => {
      const messageData = {
        data: {
          attributes: {
            name: values.body,
          },
        },
      };

      axios.post('/api/v1/channels', messageData)
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
          <Modal.Title>Add channel</Modal.Title>
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

              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="mr-2" onClick={handleClose(dispatch)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps)(MyModal);