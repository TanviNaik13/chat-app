import React, { useState } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';
import AvatarEditor from 'react-avatar-editor';

const fileInputTpes = '.png, .jpg ,.jpeg';

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
const isValid = file => acceptedFileTypes.includes(file.type);

const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();

  const [img, setImg] = useState(null);

  const onFileInputChange = ev => {
    const currFiles = ev.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];

      if (isValid(file)) {
        setImg(file);
        open();
      } else {
        Alert.warning(`Wrong file type selected ${file.type}`, 4000);
      }
    }
  };

  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTpes}
            onChange={onFileInputChange}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Upload & Edit avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100"></div>
            {img && (
              <AvatarEditor
                image={img}
                width={200}
                height={200}
                border={10}
                borderRadius={100}
                rotate={0}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost">
              upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
