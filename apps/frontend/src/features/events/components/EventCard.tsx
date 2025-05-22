import { Card, Flex, Typography } from "antd";
import { Event } from "../event.types";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import EventSignupStatus from "./EventSignupStatus";

function EventCard(event: Event) {
  const { title, date, time, image, id } = event;
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate(`/events/${id}`)}
      cover={
        <img src={image} style={{ objectFit: "cover", height: "150px" }} />
      }
      style={{ width: 240 }}
    >
      <Card.Meta
        title={title}
        description={
          <Flex justify="space-between">
            <Typography.Text>{dayjs(date).format("M/DD/YYYY")}</Typography.Text>
            <EventSignupStatus event={event} />
          </Flex>
        }
      />
    </Card>
  );
}

export default EventCard;
