import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchEvents, postEvent } from "./event.api"

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  })
}

export const useEvent = (id: string) => {
  return useQuery({ queryKey: ["event", id], queryFn: () => fetchEvent(id) });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export default useEvents