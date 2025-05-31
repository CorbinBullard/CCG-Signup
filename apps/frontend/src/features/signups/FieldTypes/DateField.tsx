import { DatePicker, Form, FormItemProps } from "antd";
import dayjs from "dayjs";

export default function DateField(props: FormItemProps) {
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
