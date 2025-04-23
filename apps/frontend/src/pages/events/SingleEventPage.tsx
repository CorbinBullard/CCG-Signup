import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../../features/events/hooks/useEvents";
import PageLayout from "../../components/layouts/PageLayout";
import { Button, Flex, Form, Image, Modal, Tabs, TabsProps } from "antd";
import FormForm from "../../features/forms/FormForm";
import { useUpdateForm } from "../../features/forms/hooks/useForms";
import EventSignups from "../../features/signups/EventSignups";
import OpenModalButton from "../../components/OpenModalButton";
import CreateSignupForm from "../../features/signups/CreateSignupForm";
import { PlusOutlined } from "@ant-design/icons";
import UpdateEvent from "../../features/events/sections/UpdateEvent";
import { useCreateSignup } from "../../features/signups/hooks/useSignups";

export default function SingleEventPage() {
  const params = useParams<{ id: string }>();
  const eventId = Number(params.id);

  const [formForm] = Form.useForm();
  const [signupForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState("signups");

  const updateForm = useUpdateForm();
  const createSignup = useCreateSignup();

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
  const tabItems: TabsProps["items"] = [
    {
      key: "signups",
      label: "Signups",
      children: <EventSignups event={event} />,
    },
    {
      key: "form",
      label: "Form",
      children: <FormForm initialValues={event.form} form={formForm} />,
    },
  ];

  const handleUpdateFormSubmit = async () => {
    const values = await formForm.validateFields();

    updateForm.mutate({
      id: event.form.id,
      form: values,
      eventId: event.id,
    });
    signupForm.resetFields();
  };

  const handleCreateSignupSubmit = async () => {
    const values = await signupForm.validateFields();

    createSignup.mutate({
      signup: values,
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
      <UpdateEvent
        event={event}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Tabs
        type="card"
        items={tabItems}
        tabBarExtraContent={
          tab === "form" ? (
            <Button onClick={() => handleUpdateFormSubmit()} type="primary">
              Save Form
            </Button>
          ) : (
            <OpenModalButton
              label="New Signup"
              btnType="primary"
              icon={<PlusOutlined />}
              modalTitle="Create Signup"
              onOk={handleCreateSignupSubmit}
            >
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
