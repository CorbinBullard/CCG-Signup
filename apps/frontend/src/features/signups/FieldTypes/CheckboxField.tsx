import { Checkbox, Form, FormItemProps } from "antd";

export default function CheckboxField(props: FormItemProps) {
  return (
    <Form.Item {...props} valuePropName="checked" initialValue={false}>
      <Checkbox defaultChecked={false} />
    </Form.Item>
  );
}
