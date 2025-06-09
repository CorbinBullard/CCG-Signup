import { Form } from "antd";
import React from "react";
import UniqueNameField from "../../components/formComponents/UniqueField";
import { useDevices } from "./hooks/useDevices";

export default function DevicesForm({ ...props }) {
  return (
    <UniqueNameField
      label={"Device Name"}
      name={"name"}
      getItemsQueryFn={useDevices}
    />
  );
}
