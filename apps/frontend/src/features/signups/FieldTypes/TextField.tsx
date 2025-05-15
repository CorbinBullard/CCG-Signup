import { Form, FormItemProps, Input } from "antd";

export default function TextField(props: FormItemProps) {
  const { required, ...rest } = props;

  return (
    <Form.Item
      {...rest}
      rules={[{ required: required, message: `${props.label} is required` }]}
      initialValue={""}
    >
      <Input />
    </Form.Item>
  );
}
