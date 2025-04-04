import { Button, Card, Checkbox, Form, Input, InputNumber, Select } from "antd";
import React from "react";
import FieldForm from "./FieldForm";
import { FieldTypeEnum } from "./field.type";

export default function CreateFieldsList() {
  return (
    <Form.List name="fields">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <FieldForm {...field} />
          ))}
          <Button onClick={() => add()}>ADD</Button>
        </>
      )}
    </Form.List>
  );
}
