import { Form, Input, Typography } from "antd";
import ResponseItemForm from "./ResponseItemForm";

export default function CreateSignupForm({
  form,
  initialValue,
  onFinish,
  fields, // this is the form definition
}) {
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={initialValue}
    >
      <Form.List name="responses">
        {(formListFields) => (
          <>
            {fields &&
              fields.map((field, index) => (
                <Form.Item
                  key={field?.id || index}
                  noStyle
                  shouldUpdate={(prev, next) => prev !== next}
                >
                  {() => (
                    <ResponseItemForm
                      {...field}
                      name={[index, "value"]}
                      index={index}
                    />
                  )}
                </Form.Item>
              ))}
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
    </Form>
  );
}
