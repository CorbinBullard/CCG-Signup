import api from "../../utils/axiosApi";

export const fetchEvents = async () => {
  const response = await api.get("/api/events");
  return response.data;
}