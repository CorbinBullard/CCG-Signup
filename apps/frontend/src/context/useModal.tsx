import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from "react";
import { Modal } from "antd";

type ModalContextType = {
  openModal: (component: ReactElement) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (component: ReactElement) => {
    setModalContent(component);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal open={isOpen} onCancel={closeModal} footer={null} destroyOnClose>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};
