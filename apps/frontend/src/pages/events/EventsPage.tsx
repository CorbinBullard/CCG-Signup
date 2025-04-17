import React, { useEffect } from "react";
import CardsContainer from "../../components/CardsContainer";
import useEvents from "../../features/events/hooks/useEvents";
import EventCard from "../../features/events/components/EventCard";
import PageLayout from "../../components/layouts/PageLayout";
import { useNavigate } from "react-router-dom";

function EventsPage() {
  const { data: events, isLoading, error } = useEvents();
  const navigate = useNavigate();

  return (
    <PageLayout
      title={"Events"}
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
