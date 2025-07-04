/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { Flex, Button, Form } from "antd";
import ItemListItem from "./ItemListItem";
import { ListItemProps } from "antd/es/list";
import { BaseButtonProps } from "antd/es/button/button";

export default function CreateFormList({
  children,
  name,
  buttonLabel,
  title,
  card,
  btnType = "dashed",
  initialValue = {},
  required = false,
  rules,
  ...props
}: {
  children: React.ReactNode;
  name: string | (string | number)[];
  buttonLabel: string;
  title?: string;
  card?: boolean;
  initialValue?: any;
  required?: boolean;
  rules?: any;
  props?: ListItemProps;
  btnType?: BaseButtonProps["type"];
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Form.List name={name} {...props} rules={rules}>
      {(fields, { add, remove, move }) => {
        function handleDragEnd(event) {
          const { active, over } = event;
          if (active.id !== over.id) {
            move(active.id, over.id);
          }
        }
        return (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields.map((field) => field.name)}
              strategy={verticalListSortingStrategy}
            >
              <Flex vertical gap={4}>
                {fields.map((field) => (
                  <SortableItem
                    id={field.name}
                    key={field.key}
                    field={field}
                    // index={index}
                    remove={remove}
                    title={title}
                    card={card}
                    fields={fields}
                    required={required}
                    // errors={errors}
                  >
                    {React.isValidElement(children)
                      ? React.cloneElement(children, { ...field })
                      : children}
                  </SortableItem>
                ))}
                <Button type={btnType} onClick={() => add(initialValue)}>
                  {buttonLabel}
                </Button>
              </Flex>
            </SortableContext>
          </DndContext>
        );
      }}
    </Form.List>
  );
}

function SortableItem({
  id,
  children,
  required,
  remove,
  title,
  card,
  field,
  fields,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* <Typography.Text
        type="warning"
        style={{ paddingLeft: "12px", marginBottom: "12px" }}
      >
        <Form.ErrorList errors={errors} />
      </Typography.Text> */}
      <ItemListItem
        card={card}
        key={field.key}
        remove={() => {
          if (!required || fields.length > 1) remove(field.name);
        }}
        title={`${title} ${field.name + 1}`}
        attributes={attributes}
        listeners={listeners}
      >
        {children}
      </ItemListItem>
    </div>
  );
}
