import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Button, Modal, ModalProps } from "antd";
import { BaseButtonProps } from "antd/es/button/button";

interface OpenModalButtonProps {
  children?: React.ReactNode;
  btnType?: BaseButtonProps["type"];
  label: string;
  icon?: React.ReactNode;
  modalTitle: string;
  onOk: () => void;
  onClose?: () => void;
  modalProps?: ModalProps;
}

const OpenModalButton = forwardRef(
  (
    {
      children,
      btnType = "primary",
      label,
      icon,
      modalTitle,
      onOk,
      onClose,
      modalProps
    }: OpenModalButtonProps,
    ref
  ) => {
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
          {...modalProps}
          destroyOnClose={true}
          title={modalTitle}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={onClose}
        >
          {children}
        </Modal>
      </>
    );
  }
);

export default OpenModalButton;
