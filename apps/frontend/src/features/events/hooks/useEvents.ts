import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchEvents,
  postEvent,
  fetchEvent,
  updateEvent,
  deleteEvent,
  updateEFC,
  fetchECForms,
  setEventStatus,
} from "../event.api";
import { useNotifications } from "../../../context/Notifications";

import { useNavigate } from "react-router-dom";

export const useEvents = (query) => {
  return useQuery({
    queryKey: ["events", query],
    queryFn: () => fetchEvents(query),
  });
};

export const useEvent = (id: number) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id),
  });
};

export const useCreateEvent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: postEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      openNotification({
        message: "Event created",
        description: "The event has been created successfully.",
        type: "success",
      });
      navigate("/events");
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error creating the event.",
        type: "error",
      });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: updateEvent,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      openNotification({
        message: "Event updated",
        description: "The event has been updated successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error updating the event.",
        type: "error",
      });
    },
  });
};

export const useDeleteEvent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      openNotification({
        message: "Event deleted",
        description: "The event has been deleted successfully.",
        type: "success",
      });
      navigate("/events");
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error deleting the event.",
        type: "error",
      });
    },
  });
};

export const useSetEventStatus = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: setEventStatus,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      openNotification({
        message: "Event status updated",
        description: "The event status has been updated successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error updating the event status.",
        type: "error",
      });
    },
  });
};

// hooks/useEventConsentForms.ts
export function useEventConsentForms(eventId: number | null) {
  return useQuery({
    queryKey: ["eventConsentForms"],
    queryFn: () => (eventId ? fetchECForms(eventId) : []),
    enabled: !!eventId,
  });
}

export const useUpdateECF = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: updateEFC,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      queryClient.invalidateQueries({ queryKey: ["eventConsentForms"] });
      openNotification({
        message: "Event Consent Form updated",
        description: "The event consent form has been updated successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error updating the event consent form.",
        type: "error",
      });
    },
  });
};

export default useEvents;
