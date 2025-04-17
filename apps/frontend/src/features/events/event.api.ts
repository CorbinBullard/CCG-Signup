import api from "../../utils/axiosApi";
import { Event } from "./event.types";

export const fetchEvents = async () => {
  const response = await api.get("/api/events");
  return response.data;
};

export const fetchEvent = async (id: number) => {
  const response = await api.get(`/api/events/${id}`);
  return response.data;
};

export const postEvent = async (event: Event) => {
  const response = await api.post("/api/events", event, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateEvent = async ({
  id,
  event,
}: {
  id: number;
  event: Partial<Event>;
}) => {
  const response = await api.put(`/api/events/${id}`, event, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
