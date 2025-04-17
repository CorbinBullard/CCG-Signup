import { DatePicker, Form, FormItemProps } from "antd";

export default function DateField(props: FormItemProps) {
  return (
    <Form.Item {...props}>
      <DatePicker />
    </Form.Item>
  );
}
