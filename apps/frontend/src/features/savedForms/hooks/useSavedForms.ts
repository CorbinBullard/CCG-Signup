import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNotifications } from "../../../context/Notifications";
import {
  createSavedForm,
  deleteSavedForm,
  fetchSavedForm,
  fetchSavedForms,
  updateSavedForm,
} from "../savedForms.api";

export const useSavedForms = (query) => {
  return useQuery({
    queryKey: ["savedForms", query],
    queryFn: () => fetchSavedForms(query),
  });
};

export const useSavedForm = (id?: number) => {
  return useQuery({
    queryKey: ["savedForms", id],
    queryFn: () => fetchSavedForm(id),
    enabled: !!id,
  });
};

export const useCreateSavedForm = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: createSavedForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedForms"] });
      openNotification({
        message: "Form created",
        description: "The Form has been created successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      console.log(error);
      openNotification({
        message: error.message,
        description: "There was an error creating the form.",
        type: "error",
      });
    },
  });
};

export const useUpdateSavedForm = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: updateSavedForm,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["savedForms"] });
      queryClient.invalidateQueries({ queryKey: ["savedForms", id] });
      openNotification({
        message: "Form updated",
        description: "The form has been updated successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error updating the form.",
        type: "error",
      });
    },
  });
};

export const useDeleteSavedForm = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: deleteSavedForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedForms"] });
      openNotification({
        message: "Form Deleted",
        description: "The form has been deleted successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error deleting the form.",
        type: "error",
      });
    },
  });
};
