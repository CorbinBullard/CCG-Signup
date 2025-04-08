import { CloseOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React from "react";

export default function ItemListItem({ children, remove }) {
  return (
    <Space>
      {children} <CloseOutlined onClick={remove} />
    </Space>
  );
}
