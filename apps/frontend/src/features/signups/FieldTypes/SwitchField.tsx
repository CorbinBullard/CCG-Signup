import { Form, FormItemProps, Switch } from "antd";

export default function SwitchField(props: FormItemProps) {
  return (
    <Form.Item {...props} valuePropName="checked" initialValue={false}>
      <Switch defaultChecked={false} />
    </Form.Item>
  );
}
