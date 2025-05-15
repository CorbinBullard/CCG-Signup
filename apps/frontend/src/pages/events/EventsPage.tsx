import { useState } from "react";
import CardsContainer from "../../components/common/CardsContainer";
import useEvents from "../../features/events/hooks/useEvents";
import EventCard from "../../features/events/components/EventCard";
import PageLayout from "../../components/layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

function EventsPage() {
  const [queryParams, setQueryParams] = useState({});
  const { data: events } = useEvents(queryParams);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setQueryParams({ ...queryParams, title: value });
  };

  return (
    <PageLayout
      title={"Events"}
      Component={<Input.Search onSearch={handleSearch} enterButton />}
      actions={[
        {
          type: "primary",
          label: "Create Event",
          onClick: () => navigate("/events/create"),
        },
      ]}
    >
      <CardsContainer data={events} CardComponent={EventCard} />
    </PageLayout>
  );
}

export default EventsPage;
