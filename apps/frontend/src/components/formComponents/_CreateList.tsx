import React, { useRef, useCallback } from "react";
import { Button, Flex, Form, Typography } from "antd";
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
  fields,
  required,
  errors,
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

  const handleDrag = (e: React.DragEvent) => {
    // e.stopPropagation();
    // e.preventDefault();
  };

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onDragStart={handleDrag}
    >
      <Typography.Text
        type="warning"
        style={{ paddingLeft: "12px", marginBottom: "12px" }}
      >
        <Form.ErrorList errors={errors} />
      </Typography.Text>
      <ItemListItem
        card={card}
        key={field.key}
        remove={() => {
          if (!required || fields.length > 1) remove(field.name);
        }}
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
  initialValue = {},
  required = false,
  rules,
  ...props
}: {
  type: "default" | "dashed" | "link" | "text" | "primary";
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
    <Form.List name={name}  {...props} rules={rules}>
      {(fields, { add, remove }, { errors }) => (
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
              fields={fields}
              required={required}
              errors={errors}
            >
              {React.isValidElement(children)
                ? React.cloneElement(children, { ...field })
                : children}
            </DraggableItem>
          ))}
          <Button type={type} onClick={() => add(initialValue)}>
            {buttonLabel}
          </Button>
        </Flex>
      )}
    </Form.List>
  );
}
