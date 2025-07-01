import ConsentFormForm from "../consentForms/components/ConsentFormForm";
import {
  useConsentForms,
  useCreateConsentForm,
} from "../consentForms/hooks/useConsentForms";
import {
  Divider,
  Flex,
  Form,
  Input,
  List,
  Select,
  SelectProps,
  Switch,
} from "antd";

import { useMemo, useRef } from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import Loader from "../../components/common/Loader";
import OpenModalButton from "../../components/common/OpenModalButton";

export default function AttachCFToEventForm() {
  const { data: consentForms, isLoading } = useConsentForms({});
  const [newConsentForm] = Form.useForm();
  const modalRef = useRef<{ closeModal: () => void; openModal: () => void }>(
    null
  );
  const createConsentForm = useCreateConsentForm();

  const cfLookupObj = useMemo(
    () =>
      consentForms?.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {}),
    [consentForms]
  );

  const selectOptions: SelectProps["options"] =
    consentForms?.map((form) => {
      return {
        label: form.name,
        value: form.id,
        data: { ...form },
      };
    }) || [];
  const formInstance = Form.useFormInstance();

  const handleSubmit = async () => {
    try {
      const values = await newConsentForm.validateFields();
      createConsentForm.mutate(values);
      modalRef.current?.closeModal();
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };
  const handleModalClose = () => {
    newConsentForm.resetFields();
    console.log("modal closed");
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Form.List name={"consentForms"}>
        {(fields, { add, remove }) => {
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
              <Flex gap={8}>
                <OpenModalButton
                  key={"new-consent-modal-btn"}
                  btnType="dashed"
                  label="New Consent Form"
                  modalTitle="Consent Form"
                  ref={modalRef}
                  onOk={handleSubmit}
                  onClose={handleModalClose}
                  modalProps={undefined}
                  icon={<PlusOutlined />}
                >
                  <Form
                    layout="vertical"
                    form={newConsentForm}
                    preserve={false}
                    initialValues={{}}
                  >
                    <ConsentFormForm />
                  </Form>
                </OpenModalButton>
                <Select
                  value={null}
                  options={filteredOptions}
                  style={{ width: "100%" }}
                  onSelect={(value) => {
                    add({ consentFormId: value, required: false });
                  }}
                  placeholder="Add Consent Form to this Event"
                />
              </Flex>
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
      {/* <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(formInstance.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}
    </>
  );
}
