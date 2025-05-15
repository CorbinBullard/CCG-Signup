import { CloseOutlined, HolderOutlined } from "@ant-design/icons";
import { Card, Flex, Space } from "antd";
import React from "react";

export default function ItemListItem({
  children,
  remove,
  title = "Item",
  card = false,
  size = "small",
  attributes,
  listeners,
  ...props
}) {
  if (card)
    return (
      <Card
        style={{ width: "100%" }}
        title={
          <HolderOutlined
            style={{ fontSize: "large" }}
            {...attributes}
            {...listeners}
          />
        }
        extra={<CloseOutlined onClick={remove} size={size} />}
      >
        {children}
      </Card>
    );
  else
    return (
      <Card>
        <Flex gap={8} {...props}>
          <HolderOutlined
            style={{ fontSize: "large" }}
            {...attributes}
            {...listeners}
          />
          {children} <CloseOutlined onClick={remove} />
        </Flex>
      </Card>
    );
}
