/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../../utils/axiosApi";

export const fetchEventSignups = async (eventId: number) => {
  const response = await api.get(`/api/events/${eventId}/signups`);
  return response.data;
};
export const fetchSignup = async (id: number) => {
  const response = await api.get(`/api/signups/${id}`);
  console.log("fetchSignup", response.data);
  return response.data;
};
export const postSignup = async ({
  eventId,
  signup,
}: {
  eventId: number;
  signup: any;
}) => {
  console.log("postSignup", signup);
  const response = await api.post(`/api/events/${eventId}/signups`, signup);
  return response.data;
};

export const updateSignup = async ({
  id,
  signup,
}: {
  id: number;
  signup: Partial<any>;
}) => {
  const response = await api.put(`/api/signups/${id}`, signup);
  return response.data;
};

export const deleteSignup = async (id: number) => {
  const response = await api.delete(`/api/signups/${id}`);
  return response.data;
};

export const createSCF = async ({
  signupId,
  scfs,
}: {
  signupId: number;
  scfs: any;
}) => {
  console.log(signupId, scfs);
  const response = await api.post(
    `/api/signups/${signupId}/consent-forms`,
    scfs
  );
  return response.data;
};
