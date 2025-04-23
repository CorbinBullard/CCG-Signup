import { Card, Form, FormItemProps } from "antd";
import { SubField } from "../../fields/field.type";
import CompositeField from "./CompositeField";

export default function MultiResponseField({
  subfields,
  label,
  name,
}: {
  subfields: SubField[];
  label: string;
  name: FormItemProps["name"];
}) {
  return (
    <Form.List name={[...name]}>
      {(fields, { add, remove }) => (
        <Card
          title={label}
          extra={<a onClick={() => add()}>Add {label}</a>}
          style={{ marginBottom: 16 }}
        >
          {fields.map((field, index) => (
            <div key={field.key} style={{ marginBottom: 16 }}>
              <CompositeField
                subfields={subfields}
                name={[field.name]} // passes name to CompositeField (becomes [responses, fieldIndex, 'value', index])
                wrapWithValue={true} // wraps the value in a single object
              />

              <a onClick={() => remove(index)} style={{ color: "red" }}>
                Remove
              </a>
            </div>
          ))}
        </Card>
      )}
    </Form.List>
  );
}
