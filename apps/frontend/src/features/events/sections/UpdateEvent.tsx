import React, { useRef, useState } from "react";
import { Event } from "../event.types";
import { Flex, Form, Image, Modal } from "antd";
import EventDetails from "../components/eventDetails";
import EventForm from "../components/_EventForm";
import { useUpdateEventSubmission } from "../hooks/useUpdateEventSubmission";
import Format from "../../../utils/Format";

export default function UpdateEvent({
  event,
  isModalOpen,
  setIsModalOpen,
}: {
  event: Event;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [eventForm] = Form.useForm();
  const fileRef = useRef<File | null>(null);

  const { submit } = useUpdateEventSubmission(event.id, eventForm, fileRef);

  const handleEventSubmit = async () => {
    await eventForm.validateFields();
    submit();
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleEventSubmit}
        width={"fit-content"}
        okText="Update Event"
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
    </>
  );
}
