import React, { useState } from "react";
import { Button, Modal } from "antd";

const OpenModalButton: React.FC = ({
  children,
  btnType,
  label,
  icon,
  modalTitle,
  onOk,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onOk();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button icon={icon} type={btnType} onClick={showModal}>
        {label}
      </Button>
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default OpenModalButton;
