import { Card, Form, Typography } from "antd";
import React from "react";
import PreviewItem from "./PreviewItem";

export default function PreviewForm({ form }) {
  const fields = Form.useWatch("fields", form);
  return (
    <Card title="Preview" style={{ width: "100%" }}>
      <Form layout="vertical">
        {fields?.map((field, index) => (
          <PreviewItem {...field} key={index} />
        ))}
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
}
