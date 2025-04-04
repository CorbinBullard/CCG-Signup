import {
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import React, { useReducer } from "react";
import { FieldTypeEnum } from "./field.type";
import CreateOptionsList from "./options/CreateOptionsList";

{
  // field = {
  //   label: "",
  //   type: "string",
  //   required: true,
  //   cost: null,
  //   options: [],
  //   subfields: [],
  // },
}
export default function FieldForm(field) {
  return (
    <Card>
      <Flex gap={16}>
        <Form.Item name={[field.name, "label"]} label="Label" required>
          <Input placeholder="Field Label" />
        </Form.Item>

        <Form.Item
          name={[field.name, "type"]}
          label="Field Type"
          required
          initialValue={FieldTypeEnum.Text}
        >
          <Select
            options={Object.entries(FieldTypeEnum).map((type) => {
              return { label: type[0], value: type[1] };
            })}
          />
        </Form.Item>

        <Form.Item
          name={[field.name, "required"]}
          label="Required"
          valuePropName="checked"
          initialValue={true}
        >
          <Checkbox />
        </Form.Item>
      </Flex>

      <Form.Item dependencies={[["fields", field.name, "type"]]}>
        {({ getFieldValue }) => {
          const type = getFieldValue(["fields", field.name, "type"]);
          console.log("type", type);
          if (
            type === FieldTypeEnum.CheckBox ||
            type === FieldTypeEnum.MultiResponse
          ) {
            return (
              <Form.Item name={[field.name, "cost"]} label="Cost">
                <InputNumber
                  min={0}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                  precision={2}
                />
              </Form.Item>
            );
          } else return null;
        }}
      </Form.Item>
      <Form.Item dependencies={[["fields", field.name, "type"]]}>
        {({ getFieldValue }) => {
          const type = getFieldValue(["fields", field.name, "type"]);
          if (type === FieldTypeEnum.Select) {
            return (
              <CreateOptionsList field={field} />
            );
          }
        }}
      </Form.Item>
    </Card>
  );
}
