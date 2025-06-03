import { useMemo } from "react";
import { ECFType } from "../ecf/efcType";
import { Form, FormInstance, Modal, Typography } from "antd";
import { CreateSignupFormSteps } from "./CreateSignupFormSteps";
import useFormStepper from "../../components/common/useFormStepper";
import { useCreateSCF } from "../signups/hooks/useSignups";

export default function SignupConsentFormsModal({
  form,
  isOpen,
  onCancel,
  signupId,
  ecfs,
  handleSubmit,
}: {
  form: FormInstance;
  isOpen: boolean;
  signupId: number | null;
  onCancel: () => void;
  handleSubmit: () => void;
  ecfs: any[];
}) {
  
  const formattedECFArray: ECFType[] = ecfs?.map((ecf: ECFType) => {
    return { ...ecf.consentForm, ...ecf };
  });

  const signupFormSteps = useMemo(
    () => CreateSignupFormSteps(formattedECFArray),
    [ecfs]
  );

  console.log(signupFormSteps);
  const {
    NextFormButton,
    PreviousFormButton,
    SubmitFormButton,
    Stepper,
    StepperForm,
  } = useFormStepper(form, signupFormSteps, handleSubmit);

  return (
    <Modal
      title={<Stepper />}
      open={isOpen}
      onCancel={onCancel}
      destroyOnClose
      width={800}
      footer={(_, { CancelBtn }) => (
        <>
          <CancelBtn />
          <PreviousFormButton />
          <NextFormButton />
          <SubmitFormButton />
        </>
      )}
    >
      {/* Placeholder for content */}
      <Form form={form}>
        <StepperForm />
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}
