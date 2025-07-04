/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { List } from "antd";
import OptionsButton from "../../components/common/OptionsButton";
import getMenuItems from "../../components/common/getMenuItems";
import { Device } from "./device.type";
import { UUID } from "crypto";

export default function DeviceList({
  devices,
  handleEdit,
  handleDelete,
}: {
  devices: Device[];
  handleEdit: (id: UUID) => void;
  handleDelete: (id: UUID) => void;
}) {
  return (
    <List
      bordered
      dataSource={devices}
      renderItem={(device): ReactNode => {
        return (
          <List.Item
            actions={[
              <OptionsButton
                items={getMenuItems({
                  name: "device",
                  handleDelete: () => handleDelete(device.id),
                  handleEdit: () => handleEdit(device.id),
                })}
              />,
            ]}
          >
            {device.name}
          </List.Item>
        );
      }}
    />
  );
}
