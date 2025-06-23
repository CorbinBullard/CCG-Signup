import { useEffect, useMemo } from "react";
import { ECFType } from "../ecf/efcType";
import { Flex, Form, FormInstance, Modal, Typography } from "antd";
import { CreateSignupFormSteps } from "./CreateSignupFormSteps";
import useFormStepper from "../../components/common/hooks/useFormStepper";
import { useEventConsentForms } from "../events/hooks/useEvents";
import Loader from "../../components/common/Loader";
import { useCreateSCF } from "../signups/hooks/useSignups";

export default function SignupConsentFormsModal({
  onCancel,
  signupId,
  eventId,
}: {
  isOpen: boolean;
  signupId: number | null;
  onCancel: () => void;
  eventId?: number;
}) {
  const { data: ecfs, isLoading, refetch } = useEventConsentForms(eventId);
  const createSCF = useCreateSCF();

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    if (!signupId) return;
    try {
      const { consents } = await form.validateFields();
      await createSCF.mutate({ signupId, scfs: consents });
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  const formattedECFArray: ECFType[] =
    ecfs?.map((ecf: ECFType) => {
      return { ...ecf.consentForm, ...ecf };
    }) || [];

  const signupFormSteps = useMemo(
    () => CreateSignupFormSteps(formattedECFArray),
    [ecfs]
  );

  const {
    NextFormButton,
    PreviousFormButton,
    SubmitFormButton,
    Stepper,
    StepperForm,
    reset: resetStepper,
  } = useFormStepper(form, signupFormSteps, handleSubmit);

  useEffect(() => {
    if (!signupId) {
      form.resetFields();
    } else {
      refetch();
    }
  }, [signupId]);

  if (isLoading) return <Loader />;

  return (
    <Modal
      title={<Stepper />}
      open={!!signupId}
      onCancel={() => {
        resetStepper();
        onCancel();
      }}
      destroyOnClose
      width={800}
      closeIcon={null}
      footer={(_, { CancelBtn }) => (
        <Flex justify="space-between">
          <CancelBtn />
          <Flex justify="end" gap={8}>
            <PreviousFormButton />
            <NextFormButton />
            <SubmitFormButton />
          </Flex>
        </Flex>
      )}
    >
      {/* Placeholder for content */}
      <Form form={form}>
        <StepperForm />
      </Form>
    </Modal>
  );
}
