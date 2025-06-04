import { Card, Checkbox, Form, Input, Typography } from "antd";

export default function SignupConsentFormForm({
  ecf,
  fieldName = "agreed", // Default for old use
  index,
  ...props
}) {
  const formInstance = Form.useFormInstance();
  const handleAgreed = (e) => {
    if (e.target.checked) {
      formInstance.setFieldValue([...fieldName, "agreedAt"], new Date());
    } else {
      formInstance.setFieldValue([...fieldName, "agreedAt"], null);
    }
  };
  return (
    <Card
      title={ecf.name}
      actions={[
        <Form.Item
          name={[...fieldName, "agreed"]}
          required
          valuePropName="checked"
          initialValue={false}
          rules={[
            {
              validator: (_, value) => {
                if (ecf.required && value !== true)
                  return Promise.reject(
                    new Error("You must agree to the terms to continue")
                  );
                return Promise.resolve();
              },
            },
          ]}
        >
          <Checkbox onChange={handleAgreed}>
            I agree to the terms and service
          </Checkbox>
        </Form.Item>,
      ]}
    >
      <Form.Item
        hidden
        name={[...fieldName, "eventConsentFormId"]}
        initialValue={ecf.id}
        shouldUpdate
      >
        <Input />
      </Form.Item>
      <Form.Item
        hidden
        name={[...fieldName, "deviceName"]}
        initialValue={"admin"}
        shouldUpdate
      >
        <Input />
      </Form.Item>
      <Form.Item
        hidden
        name={[...fieldName, "agreedAt"]}
        initialValue={null}
        shouldUpdate
      >
        <Input />
      </Form.Item>
      <Typography.Text>{ecf.body}</Typography.Text>
    </Card>
  );
}
