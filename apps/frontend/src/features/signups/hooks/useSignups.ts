import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSCF,
  deleteSignup,
  fetchEventSignups,
  fetchSignup,
  postSignup,
  updateSignup,
} from "../signups.api";
import { useNotifications } from "../../../context/Notifications";

export const useSignups = (eventId: number) => {
  return useQuery({
    queryKey: ["signups"],
    queryFn: () => fetchEventSignups(eventId),
    enabled: !!eventId,
  });
};

export const useSignup = (id: number) => {
  return useQuery({
    queryKey: ["signup", id],
    queryFn: () => fetchSignup(id),
    enabled: !!id,
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

export const useDeleteSignup = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: deleteSignup,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["signups"] });
      queryClient.invalidateQueries({ queryKey: ["signup", id] });
      openNotification({
        message: "Signup deleted",
        description: "The signup has been deleted successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error deleting the signup.",
        type: "error",
      });
    },
  });
};

export const useCreateSCF = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: createSCF,
    onSuccess: ({ eventId }) => {
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      queryClient.invalidateQueries({ queryKey: ["signups"] });
      openNotification({
        message: "Signup Consent Created",
        description: "The consent has been deleted successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error creating the Consents.",
        type: "error",
      });
    },
  });
};
