import { Form, FormItemProps, Switch } from "antd";

export default function SwitchField(props: FormItemProps) {
  return (
    <Form.Item {...props} valuePropName="checked">
      <Switch defaultChecked={false} />
    </Form.Item>
  );
}
