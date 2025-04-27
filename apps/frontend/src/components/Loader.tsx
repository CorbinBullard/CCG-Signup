// LoadingModal.tsx
import { Modal, Spin } from "antd";

export default function Loader() {
  return (
    <Modal
      open={true}
      footer={null}
      closable={false}
      centered
      maskClosable={false}
      keyboard={false}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "150px",
        }}
      >
        <Spin size="large" />
      </div>
    </Modal>
  );
}
