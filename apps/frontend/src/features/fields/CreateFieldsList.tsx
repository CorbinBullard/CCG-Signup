import { Button, Card, Checkbox, Form, Input, InputNumber, Select } from "antd";
import React from "react";
import FieldForm from "./FieldForm";
import { FieldTypeEnum } from "./field.type";
import ItemListItem from "../events/components/ItemListItem";

export default function CreateFieldsList() {
  return (
    <Form.List name="fields">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Card extra={<ItemListItem remove={() => remove(field.name)} />}>
              <FieldForm {...field} />
            </Card>
          ))}
          <Button onClick={() => add()}>ADD</Button>
        </>
      )}
    </Form.List>
  );
}
