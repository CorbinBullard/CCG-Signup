import { Form, FormItemProps, InputNumber } from "antd";

export default function NumberField(props: FormItemProps) {
  return (
    <Form.Item {...props}>
      <InputNumber style={{ width: "100%" }} min={0} />
    </Form.Item>
  );
}
