import { Button, Flex, Form } from "antd";
import React from "react";
import OptionForm from "./OptionForm";
import ItemListItem from "../../events/components/ItemListItem";

export default function CreateOptionsList({ field }) {
  console.log("field", field);
  return (
    <Form.List name={[field.name, "options"]}>
      {(options, { add, remove }) => (
        <Flex vertical gap={4}>
          {options.map((option) => (
            <ItemListItem remove={() => remove(option.name)}>
              <OptionForm {...option} />
            </ItemListItem>
          ))}
          <Button type="primary" onClick={() => add()}>
            Add Option
          </Button>
        </Flex>
      )}
    </Form.List>
  );
}
