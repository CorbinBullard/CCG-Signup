import api from "../../utils/axiosApi";

export const fetchEvents = async () => {
  const response = await api.get("/api/events");
  return response.data;
};
export const fetchEvent = async (id: number) => {
  const response = await api.get(`/api/events/${id}`);
  return response.data;
};

export const postEvent = async (event) => {
  const response = await api.post("/api/events", event, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
