import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import React from "react";

export default function OptionsButton({
  items,
}: {
  items: MenuProps["items"];
}) {
  return (
    <Dropdown trigger={["click"]} menu={{ items }}>
      <MoreOutlined style={{ fontSize: "large" }} />
    </Dropdown>
  );
}
