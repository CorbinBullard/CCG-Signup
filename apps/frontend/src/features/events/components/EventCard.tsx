import { Card } from "antd";
import { Event } from "../event.types";
import { useNavigate } from "react-router-dom";

function EventCard(event: Event) {
  const { title, date, time, image, id } = event;
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      onClick={() => navigate(`/events/${id}`)}
      cover={
        <img
          src={image}
          preview={false}
          style={{ objectFit: "cover", height: "150px" }}
        />
      }
      style={{ width: 240 }}
    >
      <Card.Meta title={title} description={date} />
    </Card>
  );
}

export default EventCard;
