import { Card } from "antd";
import { Event } from "../event.types";

function EventCard(event: Event) {
  const { title, date, time, image } = event;
  return (
    <Card
      hoverable
      cover={<img src={image} preview={false} style={{ objectFit: "cover", height: '150px' }}  />}
      style={{ width: 240 }}
    >
      <Card.Meta title={title} description={date} />
    </Card>
  );
}

export default EventCard;
