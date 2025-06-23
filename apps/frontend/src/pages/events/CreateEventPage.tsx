import React, { useRef, useMemo, useState } from "react";
import {
  Anchor,
  Button,
  Card,
  Flex,
  Form,
  Layout,
  Steps,
  Typography,
} from "antd";
import PageLayout from "../../components/layouts/PageLayout";
import { useEventSubmission } from "../../features/events/hooks/useEventSubmission";
import { createEventInitialValues } from "../../features/events/event.initialValues";

import EventForm from "../../features/events/components/EventForm";
import FormForm from "../../features/forms/FormForm";
import AttachCFToEventForm from "../../features/ecf/AttachCFToEventForm";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileRef = useRef<File | null>(null);
  const { submit } = useEventSubmission(form, fileRef);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await form.validateFields();
      await submit();
      navigate("/events");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout
      title="Create Event"
      actions={[
        <Anchor
          direction="horizontal"
          items={[
            {
              key: "event-details",
              href: "#details",
              title: "Details",
            },
            {
              key: "form",
              href: "#form",
              title: "Form",
            },
            {
              key: "part-3",
              href: "#consents",
              title: "Consent Forms",
            },
          ]}
        />,
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ marginLeft: 16 }}
          loading={isLoading}
        >
          Submit
        </Button>,
      ]}
    >
      <Layout style={{ padding: "16px", width: "100%", height: "100%" }}>
        <Content style={{ overflow: "auto", scrollbarColor: "inherit" }}>
          <Form
            layout="vertical"
            form={form}
            initialValues={{ ...createEventInitialValues }}
            preserve
          >
            <Flex vertical gap={16}>
              <Card title="Event Details" id="details">
                <EventForm ref={fileRef} />
              </Card>
              <Card title="Event Form" id="form">
                <FormForm mode="create" />
              </Card>
              <Card title="Event Consent Forms" id="consents">
                <AttachCFToEventForm />
              </Card>
              {/* <Form.Item noStyle shouldUpdate>
                {() => (
                  <Typography>
                    <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                  </Typography>
                )}
              </Form.Item> */}
            </Flex>
          </Form>
        </Content>
      </Layout>
    </PageLayout>
  );
}
