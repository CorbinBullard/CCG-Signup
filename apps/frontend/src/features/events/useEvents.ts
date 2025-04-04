import { useQuery } from "@tanstack/react-query"
import api from "../../utils/axiosApi"
import { fetchEvents } from "./event.api"

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  })
}
export default useEvents