import { DatePicker, Form, FormItemProps } from "antd";
import dayjs from "dayjs";

export default function DateField(props: FormItemProps) {
  return (
    <Form.Item
      {...props}
      style={{ width: "100%" }}
      rules={[
        { required: props.required, message: `${props.label} is required` },
      ]}
      initialValue={props.initialValue ? dayjs(props.initialValue) : null}
    >
      <DatePicker style={{ width: "100%" }} format={"MM/DD/YYYY"} />
    </Form.Item>
  );
}
