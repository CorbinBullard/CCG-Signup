import React, { useRef, useMemo } from "react";
import { Button, Card, Flex, Form, Layout, Steps, Typography } from "antd";
import PageLayout from "../../components/layouts/PageLayout";
import { useEventSubmission } from "../../features/events/hooks/useEventSubmission";
import { createEventInitialValues } from "../../features/events/event.initialValues";
import useFormStepper from "../../components/common/useFormStepper";
import { createEventFormSteps } from "../../features/events/CreateEventFormSteps";

export default function CreateEventPage() {
  const [form] = Form.useForm();
  const fileRef = useRef<File | null>(null);
  const { submit } = useEventSubmission(form, fileRef);

  const createEventSteps = useMemo(
    () => createEventFormSteps(fileRef),
    [fileRef]
  );

  const {
    PreviousFormButton,
    NextFormButton,
    SubmitFormButton,
    Stepper,
    StepperForm,
  } = useFormStepper(form, createEventSteps, submit);

  return (
    <PageLayout title="Create Event" Component={<Stepper />}>
      <Layout style={{ padding: "24px", width: "100%", height: "100%" }}>
        <Card>
          <Form
            layout="vertical"
            form={form}
            initialValues={{ ...createEventInitialValues }}
            preserve
          >
            <StepperForm />

            <Form.Item noStyle shouldUpdate>
              {() => (
                <Typography>
                  <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                </Typography>
              )}
            </Form.Item>
          </Form>
          <Flex justify="end" style={{ marginTop: 16 }}>
            <PreviousFormButton />
            <NextFormButton />
            <SubmitFormButton />
          </Flex>
        </Card>
      </Layout>
    </PageLayout>
  );
}
