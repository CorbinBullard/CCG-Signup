import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetchEvents, postEvent, fetchEvent, updateEvent } from "../event.api";
import { useNotifications } from "../../../context/Notifications";
import { Event } from "../event.types";

export const useEvents = (query) => {
  console.log("query useEvents:", query);
  return useSuspenseQuery({
    queryKey: ["events", query],
    queryFn: () => fetchEvents(query),
  });
};

export const useEvent = (id: number) => {
  return useSuspenseQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id),
  });
};

export const useCreateEvent = () => {
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

export default useEvents;
