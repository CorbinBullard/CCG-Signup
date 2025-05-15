import { DatePicker, Form, FormItemProps } from "antd";

export default function DateField(props: FormItemProps) {
  return (
    <Form.Item
      {...props}
      style={{ width: "100%" }}
      rules={[
        { required: props.required, message: `${props.label} is required` },
      ]}
    >
      <DatePicker style={{ width: "100%" }}/>
    </Form.Item>
  );
}
