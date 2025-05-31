import { Flex, Form, FormItemProps } from "antd";
import { SubField } from "../../fields/field.type";
import ResponseItemForm from "../ResponseItemForm";

export default function CompositeField({
  subfields,
  name,
  wrapWithValue = false,
  ...props
}: {
  subfields: SubField[];
  name: FormItemProps["name"];
  wrapWithValue?: boolean;
  props: FormItemProps;
}) {
  const listName = wrapWithValue ? [...name, "value"] : name;
  return (
    <Form.List {...props} name={listName}>
      {(formListFields) => (
        <Flex gap={4}>
          {subfields &&
            subfields.map((subfield, index) => (
              <ResponseItemForm
                {...subfield}
                key={index}
                name={[formListFields[index]?.name ?? index, "value"]}
                index={index}
                style={{ flex: 1 }}
              />
            ))}
        </Flex>
      )}
    </Form.List>
  );
}
