import api from "../../utils/axiosApi";
import qs from "query-string";
import { ConsentForm } from "./consentForm.type";

export const fetchConsentForms = async (query) => {
  const queryString = qs.stringify(query);
  
  const response = await api.get(`/api/consent-forms?${queryString}`);
  return response.data;
};

export const fetchConsentForm = async (id: number) => {
  const response = await api.get(`/api/consent-forms/${id}`);
  return response.data;
};

export const postConsentForm = async (consentForm: ConsentForm) => {
  const response = await api.post("/api/consent-forms", consentForm);
  return response.data;
};

export const updateConsentForm = async ({
  id,
  consentForm,
}: {
  id: number;
  consentForm: ConsentForm;
}) => {
  console.log("updated Form", consentForm, id);
  const response = await api.put(`/api/consent-forms/${id}`, consentForm);
  return response.data;
};

export const deleteConsentForm = async (id: number) => {
  const response = await api.delete(`/api/consent-forms/${id}`);
  return response.data;
};
