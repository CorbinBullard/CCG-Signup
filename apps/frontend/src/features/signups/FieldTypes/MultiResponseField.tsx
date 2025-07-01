import { Card, Flex, Form, FormItemProps, Tag, Typography } from "antd";
import { SubField } from "../../fields/field.type";
import CompositeField from "./CompositeField";

export default function MultiResponseField({
  subfields,
  label,
  name,
  cost,
  required,
}: {
  subfields?: SubField[];
  label: string;
  cost?: number;
  required?: boolean;
  name: FormItemProps["name"];
}) {
  return (
    <Form.List
      name={[...name]}
      rules={[
        {
          validator: async (_, responses) => {
            if (required && responses === null) {
              return Promise.reject(new Error(`${label} is required`));
            }
            if (required && responses.length < 1) {
              return Promise.reject(
                new Error(`At least 1 ${label} is required`)
              );
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <Card
          title={
            <Flex align="center" gap={12}>
              <Typography.Text>{label}</Typography.Text>
              {cost && cost > 0 && <Tag>+ ${cost}</Tag>}
              <Form.ErrorList
                errors={[
                  <Typography.Text type="danger">{errors}</Typography.Text>,
                ]}
              />
            </Flex>
          }
          extra={<a onClick={() => add()}>Add {label}</a>}
          style={{ marginBottom: 16 }}
        >
          {fields.map((field, index) => (
            <div key={field.key} style={{ marginBottom: 16 }}>
              <CompositeField
                subfields={subfields}
                name={[field.name]} // passes name to CompositeField (becomes [responses, fieldIndex, 'value', index])
                wrapWithValue={true} // wraps the value in a single object
                label={""}
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
