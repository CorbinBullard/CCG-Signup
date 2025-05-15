import { Event } from "../events/event.types";
import { Empty } from "antd";
import SignupTable from "./Signups";

export default function EventSignups({ event }: { event: Event }) {
  const { signups } = event;
  if (!signups.length) {
    return <Empty description="No signups yet" />;
  }

  return <SignupTable event={event} />;
}
