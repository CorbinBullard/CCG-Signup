import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Modal } from "antd";

interface OpenModalButtonProps {
  children: React.ReactNode;
  btnType?: "link" | "text" | "ghost" | "default" | "primary" | "dashed";
  label: string;
  icon?: React.ReactNode;
  modalTitle: string;
  onOk: () => void;
}

const OpenModalButton = forwardRef(({
  children,
  btnType,
  label,
  icon,
  modalTitle,
  onOk,
}: OpenModalButtonProps, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    closeModal: () => setIsModalOpen(false),
    openModal: () => setIsModalOpen(true),
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onOk();
    // Do not automatically close the modal here; parent should call closeModal if desired
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
        destroyOnClose={true}
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
});

export default OpenModalButton;
