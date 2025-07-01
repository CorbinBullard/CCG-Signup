import { useParams } from "react-router-dom";
import PageLayout from "../../components/layouts/PageLayout";
import SavedFormForm from "../../features/savedForms/SavedFormForm";
import { Button, Form } from "antd";

import Loader from "../../components/common/Loader";
import { Form as FormType } from "../../features/forms/form.types";
import {
  useCreateSavedForm,
  useSavedForm,
  useUpdateSavedForm,
} from "../../features/savedForms/hooks/useSavedForms";

export enum ModeEnum {
  create = "create",
  update = "update",
}

export default function SingleFormPage() {
  const { id } = useParams<{ id: string }>();
  const mode: ModeEnum = id ? ModeEnum.update : ModeEnum.create;
  const { data: form, isLoading } = useSavedForm(id ? +id : undefined);
  const createForm = useCreateSavedForm();
  const updateForm = useUpdateSavedForm();
  const [savedFormForm] = Form.useForm();

  const handleSubmit = async () => {
    const values: FormType = await savedFormForm.validateFields();
    if (mode === ModeEnum.create) {
      const dto: FormType = {
        ...values,
        isSaved: true,
      };
      createForm.mutate(dto);
    } else {
      if (!id) return;
      updateForm.mutate({ id: +id, form: values });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <PageLayout
      title={"Form"}
      actions={[
        <Button
          type="primary"
          onClick={handleSubmit}
          key={"create/update-form-btn"}
        >
          {mode === ModeEnum.create ? "Create Form" : "Update Form"}
        </Button>,
      ]}
    >
      <Form layout="vertical" form={savedFormForm} initialValues={form}>
        <SavedFormForm form={savedFormForm} />
      </Form>
    </PageLayout>
  );
}
