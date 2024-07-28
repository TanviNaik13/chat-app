import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import { useModalState, useMediaQuery } from '../../misc/custom-hooks';
import Dashboard from '.';

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();

  const onMobile = useMediaQuery('(max-width:992px)');
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>

      <Drawer full={onMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
