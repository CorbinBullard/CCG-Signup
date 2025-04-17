import { Form, FormItemProps, Input } from "antd";

export default function EmailField(props: FormItemProps) {
  return (
    <Form.Item
      {...props}
      rules={[
        {
          type: "email",
          message: "Please enter a valid email address",
        },
      ]}
    >
      <Input placeholder="example@email.com" />
    </Form.Item>
  );
}
