import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchSignup,
  fetchSignups,
  postSignup,
  updateSignup,
} from "../signups.api";
import { useNotifications } from "../../../context/Notifications";

export const useSignups = () => {
  return useQuery({
    queryKey: ["signups"],
    queryFn: fetchSignups,
  });
};

export const useSignup = (id: number) => {
  return useQuery({
    queryKey: ["signup", id],
    queryFn: () => fetchSignup(id),
  });
};

export const useCreateSignup = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: postSignup,
    onSuccess: (_, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: ["signups"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      openNotification({
        message: "Signup created",
        description: "The signup has been created successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error creating the signup.",
        type: "error",
      });
    },
  });
};

export const useUpdateSignup = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: updateSignup,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["signups"] });
      queryClient.invalidateQueries({ queryKey: ["signup", id] });
      openNotification({
        message: "Signup updated",
        description: "The signup has been updated successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error updating the signup.",
        type: "error",
      });
    },
  });
};
