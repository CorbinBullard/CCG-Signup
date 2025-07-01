/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormItemProps, InputNumber } from "antd";

export default function NumberField(props: FormItemProps | any) {
  return (
    <Form.Item
      {...props}
      rules={[
        { required: props.required, message: `${props.label} is required` },
      ]}
      initialValue={null}
    >
      <InputNumber style={{ width: "100%" }} min={0} />
    </Form.Item>
  );
}
