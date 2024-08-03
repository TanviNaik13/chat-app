import React from 'react';
import { Button, Icon, IconButton, Modal } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useModalState } from '../../../misc/custom-hooks';
import { auth, database } from '../../../misc/firebase';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const AskFcmBtnModal = () => {
  const { chatId } = useParams();
  const isRecievingFcm = useCurrentRoom(v => v.isRecievingFcm);
  const { isOpen, open, close } = useModalState();

  const onAccept = () => {
    database
      .ref(`/rooms/${chatId}/fcmUsers`)
      .child(auth.currentUser.uid)
      .set(true);
  };

  const onCancel = () => {
    database
      .ref(`/rooms/${chatId}/fcmUsers`)
      .child(auth.currentUser.uid)
      .remove();
  };
  return (
    <>
      <IconButton
        icon={<Icon icon="podcast" />}
        color="blue"
        size="sm"
        circle
        onClick={open}
        appearance={isRecievingFcm ? 'default' : 'ghost'}
      />

      <Modal show={isOpen} onHide={close} size="xs" backdrop="static">
        <Modal.Header>
          <Modal.Title>Notification Permission</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {isRecievingFcm ? (
            <div className="text-center">
              <Icon className="text-green mb-3" icon="check-circle" size="5x" />
              <h6>
                You are subscribed to broadcast messages sent by admins of this
                room.
              </h6>
            </div>
          ) : (
            <div className="text-center">
              <Icon
                className="text-blue mb-3"
                icon="question-circle"
                size="5x"
              />
              <h6>
                Do you want to subscribe to messages sent by admins of this room
              </h6>
            </div>
          )}

          <p className="mt-2">
            To recieve notifications make sure you allow notifications in your
            browser
          </p>

          <p>
            Permission:{' '}
            {Notification.permission === 'granted' ? (
              <span className="text-green">Granted</span>
            ) : (
              <span className="text-red">Denied</span>
            )}
          </p>
        </Modal.Body>
        <Modal.Footer>
          {isRecievingFcm ? (
            <Button color="red" onClick={onCancel}>
              unsubscribe
            </Button>
          ) : (
            <Button color="green" onClick={onAccept}>
              Yes I do
            </Button>
          )}
          <Button onClick={close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AskFcmBtnModal;
