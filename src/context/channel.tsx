import { createContext, useContext, useState } from "react";
import { ManagmentChannelResponse } from "../interface/Channel";
import { apiRequest } from "../service/config-http";
import { AxiosResponse } from "axios";

interface ChannelContextProps {
  getChannelManagmentInfo: (channelId: string) => void;
  loading: boolean;
  managmentChannelData: ManagmentChannelResponse | undefined;
}

const ChannelContext = createContext<ChannelContextProps | null>(null);

const ChannelProvider = ({ children }: { children: any }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [managmentChannelData, setManagmentChannelData] = useState<
    ManagmentChannelResponse | undefined
  >();

  const getChannelManagmentInfo = async (channelId: string) => {
    try {
      setLoading(true);
      await apiRequest
        .get(`channel/managment/${channelId}`)
        .then((response: AxiosResponse) => {
          const { data } = response;
          setManagmentChannelData(data);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChannelContext.Provider
      value={{ getChannelManagmentInfo, managmentChannelData, loading }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

function useChannel() {
  const context: ChannelContextProps | null = useContext(ChannelContext);

  if (!context) {
    throw new Error("useChannel must be used within a ChannelProvider");
  }

  return context;
}

export { ChannelProvider, useChannel };
