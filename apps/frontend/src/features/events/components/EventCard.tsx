import { Card, Flex, Tag, Typography } from "antd";
import { Event } from "../event.types";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function EventCard(event: Event) {
  const { title, date, isActive, image, id } = event;
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
          </Flex>
        }
        avatar={
          <Tag color={isActive ? "green" : "orange"}>
            {isActive ? "Active" : "Inactive"}
          </Tag>
        }
      />
    </Card>
  );
}

export default EventCard;
