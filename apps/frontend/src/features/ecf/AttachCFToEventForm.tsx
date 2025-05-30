import { data } from "react-router-dom";
import { useConsentForms } from "../consentForms/hooks/useConsentForms";
import {
  Divider,
  Form,
  Input,
  List,
  Select,
  SelectProps,
  Switch,
  Typography,
} from "antd";

import { useMemo } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Loader from "../../components/common/Loader";

export default function AttachCFToEventForm({ ...props }) {
  const { data: consentForms, isLoading } = useConsentForms({});

  const cfLookupObj = useMemo(
    () =>
      consentForms?.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {}),
    [consentForms]
  );

  console.log(cfLookupObj);

  const selectOptions: SelectProps["options"] =
    consentForms?.map((form) => {
      return {
        label: form.name,
        value: form.id,
        data: { ...form },
      };
    }) || [];
  const formInstance = Form.useFormInstance();

  if (isLoading) return <Loader />;

  return (
    <>
      <Form.List name={"consentForms"}>
        {(fields, { add, remove }, { errors }) => {
          const addedIds = fields.map((field) =>
            formInstance.getFieldValue([
              "consentForms",
              field.name,
              "consentFormId",
            ])
          );

          // 2. Filter select options
          const filteredOptions =
            selectOptions?.filter((opt) => !addedIds.includes(opt.value)) || [];

          return (
            <>
              <Select
                value={null}
                options={filteredOptions}
                style={{ width: "100%" }}
                onSelect={(value, { data }) => {
                  add({ consentFormId: value, required: false });
                }}
                placeholder="Add Consent Form to this Event"
              />
              <Divider>Added Consent Forms</Divider>
              <List
                size="small"
                bordered
                dataSource={fields}
                renderItem={(field) => {
                  return (
                    <List.Item
                      key={field.key}
                      actions={[
                        <Form.Item
                          label="Required"
                          layout="horizontal"
                          name={[field.name, "required"]}
                          valuePropName="checked"
                        >
                          <Switch defaultChecked={false} />
                        </Form.Item>,
                        <CloseOutlined onClick={() => remove(field.name)} />,
                      ]}
                    >
                      <Form.Item name={[field.name, "consentFormId"]} hidden>
                        <Input />
                      </Form.Item>
                      <Form.Item noStyle shouldUpdate>
                        {({ getFieldValue }) => {
                          const consentForms =
                            getFieldValue("consentForms") || [];
                          const item = consentForms[field.name];

                          // Safely access 'id' only if item is defined
                          const id = item?.consentFormId;
                          const cf = id ? cfLookupObj[id] : null;
                          return cf ? cf.name : "Unknown Form";
                        }}
                      </Form.Item>
                    </List.Item>
                  );
                }}
              />
            </>
          );
        }}
      </Form.List>
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(formInstance.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </>
  );
}
