import {
  Descriptions,
  DescriptionsProps,
  Divider,
  Flex,
  Typography,
} from "antd";
import { Event } from "../event.types";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import EventSignupStatus from "./EventSignupStatus";

export default function EventDetails({ event }: { event: Event }) {
  const descriptionItems: DescriptionsProps["items"] = [
    {
      label: "Event Date",
      children: new Date(event.date).toLocaleDateString(),
    },
    {
      label: "Event Time",
      children: dayjs(event.time, "HH:mm").format("h:mm A"),
    },
    { label: "Event Cost", children: `$${event.cost}` },
    { label: "Event Funds", children: event.funds.toUpperCase() },
    {
      label: "Signups",
      children: <EventSignupStatus event={event} />,
    },
  ];

  return (
    <Flex vertical gap={8}>
      <Descriptions items={descriptionItems} />
      <Divider>Description</Divider>
      <Typography.Paragraph>{event.description}</Typography.Paragraph>
    </Flex>
  );
}
