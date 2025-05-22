import api from "../../../utils/axiosApi";
import qs from "query-string";
import { Form } from "../form.types";
export const fetchSavedForms = async (query: object) => {
  const queryString = qs.stringify(query);
  const response = await api.get(`/api/form-templates?${queryString}`);
  return response.data;
};

export const fetchSavedForm = async (id: number) => {
  const response = await api.get(`/api/form-templates/${id}`);
  return response.data;
};

export const createSavedForm = async (form: Form) => {
  const response = await api.post("api/form-templates", form);
  return response.data;
};

export const updateSavedForm = async ({
  id,
  form,
}: {
  id: number;
  form: Form;
}) => {
  const response = await api.put(`/api/form-templates/${id}`, form);
  return response.data;
};
