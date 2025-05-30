import { Form, Input } from "antd";

export default function ConsentFormForm({ ...props }) {
  return (
    <>
      <Form.Item
        name={"name"}
        label="Name"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"body"}
        label="Message Body"
        required
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
    </>
  );
}
