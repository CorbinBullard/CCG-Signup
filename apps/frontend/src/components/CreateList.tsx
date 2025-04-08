import { Button, Flex, Form } from "antd";
import React from "react";
import ItemListItem from "../features/events/components/ItemListItem";

export default function CreateList({ children, name, buttonLabel }) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <Flex vertical gap={4}>
          {fields.map((field) => {
            const childWithProps = React.isValidElement(children)
              ? React.cloneElement(children, { ...field })
              : children;
            return (
              <ItemListItem key={field.key} remove={() => remove(field.name)}>
                {childWithProps}
              </ItemListItem>
            );
          })}
          <Button type="primary" onClick={() => add()}>
            {buttonLabel}
          </Button>
        </Flex>
      )}
    </Form.List>
  );
}
