import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSavedForm,
  fetchForm,
  fetchSavedForms,
  updateForm,
} from "../form.api";
import { useNotifications } from "../../../context/Notifications";

// export const useForms = (query) => {
//   return useQuery({
//     queryKey: ["forms", query],
//     queryFn: () => fetchSavedForms(query),
//   });
// };

export const useForm = (id: number) => {
  return useQuery({
    queryKey: ["form", id],
    queryFn: () => fetchForm(id),
    enabled: !!id,
  });
};

// export const useCreateForm = () => {
//   const queryClient = useQueryClient();
//   const openNotification = useNotifications();
//   return useMutation({
//     mutationFn: createSavedForm,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["forms"] });
//       openNotification({
//         message: "Form created",
//         description: "The Form has been created successfully.",
//         type: "success",
//       });
//     },
//     onError: (error) => {
//       openNotification({
//         message: error.message,
//         description: "There was an error creating the form.",
//         type: "error",
//       });
//     },
//   });
// };

export const useUpdateForm = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: updateForm,
    onSuccess: ({ id }, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
      queryClient.invalidateQueries({ queryKey: ["form", id] });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
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
