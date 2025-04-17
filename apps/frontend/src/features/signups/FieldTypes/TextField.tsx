import { Form, FormItemProps, Input } from "antd";

export default function TextField(props: FormItemProps) {

  return (
    <Form.Item {...props}>
      <Input />
    </Form.Item>
  );
}
