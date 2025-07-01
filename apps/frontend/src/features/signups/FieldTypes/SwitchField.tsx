/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormItemProps, Switch } from "antd";

export default function SwitchField(props: FormItemProps | any) {
  return (
    <Form.Item {...props} valuePropName="checked" initialValue={false}>
      <Switch defaultChecked={false} />
    </Form.Item>
  );
}
