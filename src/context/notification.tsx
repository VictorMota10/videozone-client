import { createContext, useContext } from "react";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

interface NotificationProps {
  openNotification: (
    type: "success" | "error" | "warning" | "info",
    title: string,
    message: string,
    placement?: NotificationPlacement
  ) => void;
}

const NotificationContext = createContext<NotificationProps | null>(null);

const NotificationProvider = ({ children }: { children: any }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: "success" | "error" | "warning" | "info",
    title: string,
    message: string,
    placement?: NotificationPlacement
  ) => {
    api[type ?? "info"]({
      message: title || "Notification",
      description: message || "default",
      placement,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        openNotification,
      }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

function useNotification() {
  const context: any = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifcation must be used within a NotificationProvider"
    );
  }

  return context;
}

export { NotificationProvider, useNotification };
