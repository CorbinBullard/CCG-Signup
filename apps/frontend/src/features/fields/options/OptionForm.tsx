import { Flex, Form, Input, InputNumber, Space } from "antd";
import React from "react";
import CostInput from "../../../components/formComponents/CostInput";

export default function OptionForm(option) {
  return (
    <Flex key={option.fieldKey} gap={12} align="center">
      <Form.Item
        name={[option.name, "label"]}
        label="Label"
        rules={[{ required: true, message: "Option Label Is Required" }]}
      >
        <Input placeholder="Option Label" />
      </Form.Item>
      <Form.Item name={[option.name, "cost"]} label="Additional Cost">
        <CostInput />
      </Form.Item>
    </Flex>
  );
}
