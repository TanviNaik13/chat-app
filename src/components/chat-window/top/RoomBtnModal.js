import React from 'react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import ModalHeader from 'rsuite/lib/Modal/ModalHeader';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';

const RoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();
  const description = useCurrentRoom(v => v.description);
  const name = useCurrentRoom(v => v.name);

  return (
    <>
      <Button appearance="link" className="px-0" onClick={open}>
        Room Information
      </Button>

      <Modal show={isOpen} onHide={close}>
        <ModalHeader>
          <Modal.Title>About {name}</Modal.Title>
        </ModalHeader>
        <ModalBody>
          <h6 className="mb-1">Description</h6>
          <p>{description}</p>
        </ModalBody>
        <ModalFooter>
          <Button block onClick={close}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default RoomBtnModal;
