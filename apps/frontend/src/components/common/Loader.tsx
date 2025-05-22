import React from "react";
import { Spin } from "antd";

const loaderStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 9999,
  background: "rgba(255,255,255,0.6)", // Slight overlay, adjust as needed
  backdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Loader({ spinning = true }: { spinning?: boolean }) {
  if (!spinning) return null;
  return (
    <div style={{ ...loaderStyle }}>
      <Spin size="large" />
    </div>
  );
}
