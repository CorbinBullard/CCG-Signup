/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormItemProps, Input } from "antd";

export default function EmailField(props: FormItemProps | any) {
  return (
    <Form.Item
      {...props}
      style={{ width: "100%" }}
      rules={[
        { required: props.required, message: `${props.label} is required` },
        {
          type: "email",
          message: "Please enter a valid email address",
        },
      ]}
      initialValue={""}
    >
      <Input placeholder="example@email.com" />
    </Form.Item>
  );
}
