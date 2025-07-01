/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, Form, FormItemProps } from "antd";

export default function DateField(props: FormItemProps | any) {
  return (
    <Form.Item
      {...props}
      rules={[
        { required: props.required, message: `${props.label} is required` },
      ]}
      initialValue={null}
    >
      <DatePicker style={{ width: "100%" }} format={"M/DD/YYYY"} />
    </Form.Item>
  );
}
