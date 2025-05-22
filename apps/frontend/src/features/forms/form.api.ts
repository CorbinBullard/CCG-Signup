import api from "../../utils/axiosApi";
import qs from "query-string";
import { Form } from "./form.types";


export const fetchForm = async (id: number) => {
  const response = await api.get(`/api/forms/${id}`);
  return response.data;
};


export const updateForm = async ({ id, form }: { id: number; form: Form }) => {
  const response = await api.put(`/api/forms/${id}`, form);
  return response.data;
};

// SAVED FORMS

