import { Form, FormInstance, Input, Typography } from "antd";
import ResponseItemForm from "./ResponseItemForm";
import { Field } from "../fields/field.type";

export default function SignupForm({
  fields, // this is the form definition
  ...props
}: {
  form: FormInstance;
  fields: Field[];
}) {
  const form: FormInstance = Form.useFormInstance();
  return (
    <>
      <Form.List name="responses">
        {(formListFields) => (
          <>
            {formListFields.map((formField, index) => {
              const field = fields[index];

              return (
                <ResponseItemForm
                  {...field}
                  {...formField}
                  name={[formField.name, "value"]}
                  index={formField.key}
                  key={formField.key}
                />
              );
            })}
          </>
        )}
      </Form.List>

      {/* Optional: additional note field */}
      <Form.Item name="note" label="Note">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </>
  );
}
