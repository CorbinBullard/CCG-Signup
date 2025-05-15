import { Card, Form } from "antd";
import React from "react";
import SignupForm from "../../signups/SignupForm";
import { signupDefaultValues } from "../../signups/signup.defaultValues";
import ResponseItemForm from "../../signups/ResponseItemForm";

export default function PreviewForm({ mode = "create", form, ...props }) {
  // Conditionally set the watch path based on mode
  const watchPath = mode === "create" ? ["form", "fields"] : "fields";

  const fields = Form.useWatch(watchPath, form) || [];

  const [fakeForm] = Form.useForm();

  return (
    <Card title="Preview" style={{ width: "100%" }} {...props}>
      <Form form={fakeForm} layout="vertical">
        {fields.map((field, index) => (
          <ResponseItemForm {...field} name={[index, "value"]} key={index} />
        ))}
      </Form>
    </Card>
  );
}
