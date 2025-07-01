import { UUID } from "crypto";
import api from "../../utils/axiosApi";

export const fetchDevices = async () => {
  const response = await api.get("/api/devices");
  return response.data;
};

export const createDevice = async (name: string) => {
  const response = await api.post("/api/devices/register", { name });
  return response.data;
};

export const updateDevice = async ({
  id,
  name,
}: {
  id: UUID;
  name: string;
}) => {
  const response = await api.put(`/api/devices/${id}`, { name });
  return response.data;
};

export const deleteDevice = async (id: UUID) => {
  const response = await api.delete(`/api/devices/${id}`);
  return response.data;
};

export const deleteInactive = async () => {
  const response = await api.delete("/api/devices/inactive");
  return response.data;
};
