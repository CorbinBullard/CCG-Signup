import { Card } from "antd";
import React, { JSX } from "react";
import { Event } from "../event.types";

function EventCard(event: Event) {
  const { title, description, date, time, image } = event;
  return (
    <Card
      hoverable
      cover={<img src={image} preview={false} />}
      style={{ width: 240 }}
    >
      <Card.Meta title={title} description={date} />
    </Card>
  );
}

export default EventCard;
