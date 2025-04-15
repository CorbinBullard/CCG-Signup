import { CloseOutlined, HolderOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import React from "react";

export default function ItemListItem({
  children,
  remove,
  title = "Item",
  card = false,
  size = "small",
  ...props
}) {
  if (card)
    return (
      <Card
        title={<HolderOutlined style={{ fontSize: "large", }} />}
        extra={<CloseOutlined onClick={remove} size={size} />}
      >
        {children}
      </Card>
    );
  else
    return (
      <Space>
        {children} <CloseOutlined onClick={remove} />
      </Space>
    );
}
