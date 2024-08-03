import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import { functions } from '../../../misc/firebase';
import { useParams } from 'react-router-dom';

const { StringType } = Schema.Types;

const model = Schema.Model({
  title: StringType().isRequired('Title is required'),
  message: StringType().isRequired('Message is required'),
});

const INITIAL_FORM = {
  title: '',
  message: '',
};

const SendFcmBtnModal = () => {
  const { chatId } = useParams();
  const { isOpen, open, close } = useModalState();
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    setIsLoading(true);

    try {
      const sendFcm = functions.httpsCallable('sendFcm');
      await sendFcm({ chatId, ...formValue });
      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
      Alert.info('notification sent', 5000);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button appearance="primary" size="xs" onClick={open}>
        <Icon icon="podcast" />
        Broadcast Message
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Notify room users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                name="title"
                placeholder="Enter message title ..."
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Message</ControlLabel>
              <FormControl
                componentClass="textarea"
                row={5}
                name="message"
                placeholder="Enter notification message"
              ></FormControl>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Publish Message
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SendFcmBtnModal;
