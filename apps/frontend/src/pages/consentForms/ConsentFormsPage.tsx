import { Form, Input } from "antd";
import PageLayout from "../../components/layouts/PageLayout";
import { useEffect, useRef, useState } from "react";
import OpenModalButton from "../../components/common/OpenModalButton";
import ConsentFormForm from "../../features/consentForms/components/ConsentFormForm";
import {
  useConsentForm,
  useConsentForms,
  useCreateConsentForm,
  useDeleteConsentForm,
  useUpdateConsentForm,
} from "../../features/consentForms/hooks/useConsentForms";
import ConsentFormList from "../../features/consentForms/components/ConsentFormList";

export default function ConsentFormsPage() {
  const [queryParams, setQueryParams] = useState({});
  const [consentFormId, setConsentFormId] = useState<number | null>(null);
  const [consentForm] = Form.useForm();
  const modalRef = useRef<{ closeModal: () => void; openModal: () => void }>(
    null
  );

  const { data: consentForms = [] } = useConsentForms(queryParams);
  const { data: currentConsentForm } = useConsentForm(consentFormId);
  const createConsentForm = useCreateConsentForm();
  const updateConsentForm = useUpdateConsentForm();
  const deleteConsentForm = useDeleteConsentForm();

  // Search handler
  const handleSearch = (value: string) => {
    setQueryParams({ ...queryParams, name: value });
  };

  // Open modal to edit consent form
  useEffect(() => {
    if (consentFormId && currentConsentForm) {
      consentForm.setFieldsValue(currentConsentForm);
      modalRef.current?.openModal();
    }
  }, [consentFormId, currentConsentForm, consentForm]);

  // Reset form and selected consentFormId when modal is closed
  const handleModalClose = () => {
    setConsentFormId(null);
    consentForm.resetFields();
    console.log("modal closed");
  };

  // Create or update consent form
  const handleSubmit = async () => {
    try {
      const values = await consentForm.validateFields();
      if (consentFormId) {
        updateConsentForm.mutate({ id: consentFormId, consentForm: values });
      } else {
        createConsentForm.mutate(values);
      }
      modalRef.current?.closeModal();
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout
      title="Consent Forms"
      Component={<Input.Search onSearch={handleSearch} enterButton />}
      actions={[
        <OpenModalButton
          key={"new-consent-modal-btn"}
          btnType="primary"
          label="New Consent Form"
          modalTitle="Consent Form"
          ref={modalRef}
          onOk={handleSubmit}
          onClose={handleModalClose}
        >
          <Form
            layout="vertical"
            form={consentForm}
            preserve={false}
            initialValues={
              consentFormId && currentConsentForm ? currentConsentForm : {}
            }
          >
            <ConsentFormForm />
          </Form>
        </OpenModalButton>,
      ]}
    >
      <ConsentFormList
        consentForms={consentForms}
        handleEdit={setConsentFormId}
        handleDelete={deleteConsentForm.mutate}
      />
    </PageLayout>
  );
}
