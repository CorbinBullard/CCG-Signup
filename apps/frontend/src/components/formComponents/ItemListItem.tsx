import { CloseOutlined, HolderOutlined } from "@ant-design/icons";
import { Card, Flex } from "antd";

export default function ItemListItem({
  children,
  remove,
  card = false,
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
        extra={<CloseOutlined onClick={remove} size={24} />}
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
