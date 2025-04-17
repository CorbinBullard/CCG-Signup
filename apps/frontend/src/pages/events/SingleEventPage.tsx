import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../../features/events/hooks/useEvents";
import PageLayout from "../../components/layouts/PageLayout";
import { Button, Flex, Form, Image, Modal, Tabs, TabsProps } from "antd";
import EventForm from "../../features/events/components/EventForm";
import EventDetails from "../../features/events/components/eventDetails";
import Format from "../../utils/Format";
import { useUpdateEventSubmission } from "../../features/events/hooks/useUpdateEventSubmission";
import FormForm from "../../features/forms/FormForm";
import { useUpdateForm } from "../../features/forms/hooks/useForms";
import EventSignups from "../../features/signups/EventSignups";
import OpenModalButton from "../../components/OpenModalButton";
import CreateSignupForm from "../../features/signups/CreateSignupForm";

export default function SingleEventPage() {
  const params = useParams<{ id: string }>();
  const eventId = Number(params.id);

  const [eventForm] = Form.useForm();
  const [formForm] = Form.useForm();
  const [signupForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState("signups");

  const fileRef = useRef<File | null>(null);
  const updateForm = useUpdateForm();
  const { submit: eventSubmit } = useUpdateEventSubmission(
    eventId,
    eventForm,
    fileRef
  );
  const {
    data: event,
    isLoading,
    isError,
  } = useEvent(eventId, {
    enabled: !isNaN(eventId),
  });

  if (isNaN(eventId)) {
    return <div>Invalid event ID</div>;
  }

  if (isLoading) {
    return <div>Loading event...</div>;
  }

  if (isError || !event) {
    return <div>Event not found</div>;
  }
  console.log(event);
  const tabItems: TabsProps["items"] = [
    {
      key: "signups",
      label: "Signups",
      children: <EventSignups />,
    },
    {
      key: "form",
      label: "Form",
      children: <FormForm initialValues={event.form} form={formForm} />,
    },
  ];

  const handleEventSubmit = () => {
    eventForm.validateFields();
    eventSubmit();
  };

  const handleFormSubmit = async () => {
    const values = await formForm.validateFields();
    console.log("Form Form", values);
    updateForm.mutate({
      id: event.form.id,
      form: values,
      eventId: event.id,
    });
  };

  return (
    <PageLayout
      title={event.title}
      actions={[
        {
          label: "Edit Event Details",
          type: "primary",
          onClick: () => setIsModalOpen(true),
        },
      ]}
    >
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleEventSubmit}
        width={"fit-content"}
      >
        <EventForm
          ref={fileRef}
          form={eventForm}
          initialValues={Format.Event(event)}
        />
      </Modal>
      <Flex gap={16}>
        <Flex flex={1}>
          <Image
            src={event.image}
            width={"100%"}
            height={300}
            preview={false}
            style={{ objectFit: "cover" }}
          />
        </Flex>
        <Flex flex={2}>
          <EventDetails event={event} />
        </Flex>
      </Flex>
      <Tabs
        type="card"
        items={tabItems}
        tabBarExtraContent={
          tab === "form" ? (
            <Button onClick={() => handleFormSubmit()} type="primary">
              Save Form
            </Button>
          ) : (
            <OpenModalButton>
              <CreateSignupForm fields={event.form.fields} form={signupForm} />
            </OpenModalButton>
          )
        }
        onChange={(key) => setTab(key)}
        activeKey={tab}
      />
    </PageLayout>
  );
}
