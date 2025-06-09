import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDevice,
  deleteDevice,
  deleteInactive,
  fetchDevices,
  updateDevice,
} from "../devices.api";
import { useNotifications } from "../../../context/Notifications";

export const useDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });
};

export const useUpdateDevice = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: updateDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      openNotification({
        message: "Device updated",
        description: "The device name has been updated successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error updating the device name.",
        type: "error",
      });
    },
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  const openNotification = useNotifications();
  return useMutation({
    mutationFn: deleteDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      openNotification({
        message: "Device deleted",
        description: "The device has been deleted successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      openNotification({
        message: error.message,
        description: "There was an error deleting the device.",
        type: "error",
      });
    },
  });
};

export const useRemoveInactiveDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInactive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
