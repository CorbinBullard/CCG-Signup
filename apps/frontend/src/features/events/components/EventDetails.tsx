import {
  Descriptions,
  DescriptionsProps,
  Divider,
  Flex,
  Typography,
} from "antd";
import React from "react";
import { Event } from "../event.types";
import dayjs from "dayjs";

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
    { label: "Signups", children: event.signups.length },
  ];

  return (
    <Flex vertical gap={8}>
      <Descriptions items={descriptionItems} />
      <Divider>Description</Divider>
      <Typography.Paragraph>{event.description}</Typography.Paragraph>
    </Flex>
  );
}
