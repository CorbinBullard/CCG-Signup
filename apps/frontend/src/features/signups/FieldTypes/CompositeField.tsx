import { Flex, Form, FormItemProps } from "antd";
import { SubField } from "../../fields/field.type";
import ResponseItemField from "../ResponseItemForm";

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
        <Flex>
          {subfields &&
            subfields.map((subfield, index) => (
              <ResponseItemField
                {...subfield}
                key={index}
                name={[formListFields[index]?.name ?? index, "value"]}
                index={index}
              />
            ))}
        </Flex>
      )}
    </Form.List>
  );
}
