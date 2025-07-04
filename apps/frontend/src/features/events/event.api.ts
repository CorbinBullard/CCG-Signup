import api from "../../utils/axiosApi";
import { Event } from "./event.types";
import qs from "query-string";

export const fetchEvents = async (query) => {
  const queryString = qs.stringify(query);

  const response = await api.get(`/api/events?${queryString}`);
  return response.data;
};

export const fetchEvent = async (id: number) => {
  const response = await api.get(`/api/events/${id}`);
  return response.data;
};

export const postEvent = async (event: Event | FormData) => {
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
  event: Partial<Event> | FormData;
}) => {
  const response = await api.put(`/api/events/${id}`, event, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteEvent = async (id: number) => {
  const response = await api.delete(`/api/events/${id}`);
  return response.data;
};

export const setEventStatus = async ({ id, isActive }) => {
  const response = await api.patch(`/api/events/${id}/status`, { isActive });
  return response.data;
};

export const fetchECForms = async (eventId: number) => {
  const response = await api.get(`/api/events/${eventId}/consent-forms`);
  return response.data;
};

export const updateEFC = async ({ id, ecfArray }) => {
  console.log(ecfArray);
  const response = await api.put(`/api/events/${id}/consent-forms`, ecfArray);
  return response.data;
};
