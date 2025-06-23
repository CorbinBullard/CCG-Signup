import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteConsentForm,
  fetchConsentForm,
  fetchConsentForms,
  postConsentForm,
  updateConsentForm,
} from "../consentForms.api";
import { useNotifications } from "../../../context/Notifications";
import { useNavigate } from "react-router-dom";

export const useConsentForms = (query) => {
  return useQuery({
    queryKey: ["consent-forms", query],
    queryFn: () => fetchConsentForms(query),
  });
};

export const useConsentForm = (id: number | null) => {
  return useQuery({
    queryKey: ["consent-form", id],
    queryFn: () => fetchConsentForm(id),
    enabled: !!id,
  });
};

export const useCreateConsentForm = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: postConsentForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consent-forms"] });
      openNotification({
        message: "Consent Form created",
        description: "The consent form has been created successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error creating the consent form.",
        type: "error",
      });
    },
  });
};

export const useUpdateConsentForm = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: updateConsentForm,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["consent-forms"] });
      queryClient.invalidateQueries({ queryKey: ["consent-form", id] });

      openNotification({
        message: "Consent Form updated",
        description: "The consent form has been updated successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error updating the consent form.",
        type: "error",
      });
    },
  });
};

export const useDeleteConsentForm = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: deleteConsentForm,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["consent-forms"] });
      queryClient.invalidateQueries({ queryKey: ["consent-form", id] });

      openNotification({
        message: "Consent Form deleted",
        description: "The consent form has been deleted successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error deleting the consent form.",
        type: "error",
      });
    },
  });
};
