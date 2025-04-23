import React from "react";
import { Event } from "../events/event.types";
import { Empty } from "antd";
import SignupTable from "./signupTable/SignupTable";

export default function EventSignups({ event }: { event: Event }) {
  const { signups } = event;
  if (!signups.length) {
    return <Empty description="No signups yet" />;
  }

  return <SignupTable event={event} />;
}
