import { useCallback, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { notification } from "antd";

type NotificationArgs = {
  message: string;
  description?: string;
  type: "success" | "info" | "warning" | "error";
};

const NotificationContext = createContext<(args: NotificationArgs) => void>(() => {});

export const useNotifications = () => useContext(NotificationContext);

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<NotificationArgs | null>(null);

  const openNotification = useCallback((args: NotificationArgs) => {
    setQueue(args); // queue it to trigger inside an effect
  }, []);

  useEffect(() => {
    if (queue) {
      notification[queue.type]({
        message: queue.message,
        description: queue.description,
      });
      setQueue(null); // clear the queue after showing
    }
  }, [queue]);

  return (
    <NotificationContext.Provider value={openNotification}>
      {children}
    </NotificationContext.Provider>
  );
}