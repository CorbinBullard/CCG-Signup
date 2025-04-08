import { Form, Input, InputNumber, Space } from "antd";
import React from "react";
import CostInput from "../../../components/CostInput";

export default function OptionForm(option) {
  return (
    <Space key={option.fieldKey}>
      <Form.Item name={[option.name, "label"]} label="Label" required>
        <Input placeholder="Option Label" />
      </Form.Item>
      <Form.Item name={[option.name, "cost"]} label="Additional Cost">
        <CostInput />
      </Form.Item>
    </Space>
  );
}
