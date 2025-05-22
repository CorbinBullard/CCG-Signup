import { Event } from "../events/event.types";
import { Empty } from "antd";
import Signups from "./Signups";

export default function EventSignups({ event }: { event: Event }) {
  const { signups } = event;
  if (!signups.length) {
    return <Empty description="No signups yet" />;
  }

  return <Signups event={event} />;
}
