/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormItemProps, Input } from "antd";
import { Field } from "../../fields/field.type";

export default function TextField(props: FormItemProps | Field | any) {
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
