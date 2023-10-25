import { socket } from "../index";
import { socketEvents } from "../../../../utils/events.map";
import { pathRoutes } from "../../../../service/path-routes";

export const newViewer = (setViewers: any) => {
  socket.on(socketEvents.newViewerSession, (data: any) => {
    setViewers((prevState: any) => [...prevState, data]);
  });
};

export const removedFromSession = (
  user_uuid: string,
  navigate: any,
  openNotification: any
) => {
  socket.on(socketEvents.removedFromSession, (data: any) => {
    if (data?.user_uuid === user_uuid) {
      openNotification("info", "Informação", "Você foi removido da sessão...");
      navigate(pathRoutes.HOME);
    }
  });
};

export const askVideoTime = (
  host_socket_id: string,
  sender_socket_id: string
) => {
  socket.emit(socketEvents.askVideoTime, {
    sender: sender_socket_id,
    to: host_socket_id,
  });
};

export const receiveAskVideoTime = (getTimerAndSend: () => any) => {
  socket.on(socketEvents.whatTimeVideo, (data: any) => {
    console.log(data);
    const time = getTimerAndSend();
    socket.emit(socketEvents.responseTimeVideo, {
      to: data?.sender,
      current_time: time,
    });
  });
};

export const receiveTimeOfVideo = (
  syncTimer: (current_time: number) => void
) => {
  socket.on(socketEvents.currentTimeOfVideo, (data: any) => {
    syncTimer(data.current_time);
  });
};
