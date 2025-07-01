import { Card, Flex, Form, FormItemProps } from "antd";
import { SubField } from "../../fields/field.type";
import ResponseItemForm from "../ResponseItemForm";

export default function CompositeField({
  label,
  subfields,
  name,
  wrapWithValue = false,
  ...props
}: {
  label: string;
  subfields?: SubField[];
  name: FormItemProps["name"];
  wrapWithValue?: boolean;
  props?: FormItemProps | any;
}) {
  const listName = wrapWithValue ? [...name, "value"] : name;
  return (
    <Form.List {...props} name={listName}>
      {(formListFields) => (
        <Card size="small" title={label}>
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
        </Card>
      )}
    </Form.List>
  );
}
