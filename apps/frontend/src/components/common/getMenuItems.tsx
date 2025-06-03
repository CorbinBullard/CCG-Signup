import { MenuProps, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// Make into a type/ interface?
const getMenuItems = ({
  name,
  handleEdit,
  handleDelete,
  extraFields = [],
}: {
  name: string;
  handleEdit: () => void;
  handleDelete: () => void;
  extraFields?: MenuProps["items"];
}): MenuProps["items"] => {
  const onDelete = () => {
    Modal.confirm({
      title: `Delete ${name}`,
      content: `Are you sure you want to delete this ${name}?`,
      onOk: handleDelete,
    });
  };

  return [
    {
      key: 0,
      label: `Edit ${name}`,
      icon: <EditOutlined style={{ color: "skyblue" }} />,
      onClick: handleEdit,
    },
    ...extraFields,
    {
      key: 1,
      label: `Delete ${name}`,
      icon: <DeleteOutlined style={{ color: "red" }} />,
      danger: true,
      onClick: () => onDelete(),
    },
    
  ];
};

export default getMenuItems;
