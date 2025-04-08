import React from "react";
import { Checkbox, Flex, Form, Input, Select } from "antd";
import { FieldTypeEnum, SubFieldTypeEnum } from "./field.type";
import CostInput from "../../components/CostInput";

export default function SubfieldForm(subfield) {
  return (
    <>
      <Flex gap={16}>
        <Form.Item name={[subfield.name, "label"]} label="Label" required>
          <Input placeholder="Field Label" />
        </Form.Item>

        <Form.Item
          name={[subfield.name, "type"]}
          label="Field Type"
          required
          initialValue={FieldTypeEnum.Text}
        >
          <Select
            options={Object.entries(SubFieldTypeEnum).map((type) => {
              return { label: type[0], value: type[1] };
            })}
          />
        </Form.Item>

        <Form.Item
          name={[subfield.name, "required"]}
          label="Required"
          valuePropName="checked"
          initialValue={true}
        >
          <Checkbox />
        </Form.Item>
      </Flex>
      {/* NEEDS ACCESS TO PARENT FIELD */}
      <Form.Item dependencies={[["fields", subfield.name, "type"]]}>
        {({ getFieldValue }) => {
          const type = getFieldValue(["fields", subfield.name, "type"]);
          console.log("type", type);
          if (type === FieldTypeEnum.CheckBox) {
            return (
              <Form.Item name={[subfield.name, "cost"]} label="Cost">
                <CostInput />
              </Form.Item>
            );
          } else return null;
        }}
      </Form.Item>
    </>
  );
}
