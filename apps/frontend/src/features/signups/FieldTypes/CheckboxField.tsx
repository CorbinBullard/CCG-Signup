import { Checkbox, Form, FormItemProps } from "antd";

export default function CheckboxField(props: FormItemProps) {
  return (
    <Form.Item {...props} valuePropName="checked">
      <Checkbox defaultChecked={false} />
    </Form.Item>
  );
}
