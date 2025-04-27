import React, { useRef, useCallback } from "react";
import { Button, Flex, Form } from "antd";
import { useDrag, useDrop } from "react-dnd";
import ItemListItem from "./ItemListItem";

const ITEM_TYPE = "LIST_ITEM";

const DraggableItem = ({
  field,
  index,
  moveItem,
  remove,
  children,
  title,
  card,
}) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item) {
      if (item.index === index) return;
      moveItem(item.index, index);
      item.index = index;
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <ItemListItem
        card={card}
        key={field.key}
        remove={() => remove(field.name)}
        title={`${title} ${field.name + 1}`}
      >
        {children}
      </ItemListItem>
    </div>
  );
};

export default function CreateList({
  children,
  name,
  buttonLabel,
  title,
  card,
  type = "dashed",
  initialValue,
  ...props
}: {
  type:  "default" | "dashed" | "link" | "text" | "primary", 
}) {
  const form = Form.useFormInstance();

  const moveItem = useCallback(
    (from, to) => {
      const values = form.getFieldValue(name) || [];
      const updated = [...values];
      const [movedItem] = updated.splice(from, 1);
      updated.splice(to, 0, movedItem);
      form.setFieldValue(name, updated);
    },
    [form, name]
  );

  return (
    <Form.List name={name} initialValue={initialValue} {...props}>
      {(fields, { add, remove }) => (
        <Flex vertical gap={4}>
          {fields.map((field, index) => (
            <DraggableItem
              key={field.key}
              field={field}
              index={index}
              moveItem={moveItem}
              remove={remove}
              title={title}
              card={card}
            >
              {React.isValidElement(children)
                ? React.cloneElement(children, { ...field })
                : children}
            </DraggableItem>
          ))}
          <Button type={type} onClick={() => add()}>
            {buttonLabel}
          </Button>
        </Flex>
      )}
    </Form.List>
  );
}
