import { Form, Input } from "antd";
import { useConsentForms } from "../hooks/useConsentForms";
import UniqueNameField from "../../../components/formComponents/UniqueField";

export default function ConsentFormForm() {
  return (
    <>
      <UniqueNameField
        label={"Name"}
        name={"name"}
        getItemsQueryFn={useConsentForms}
      />
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
