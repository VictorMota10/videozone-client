import { socket } from "../index";
import { socketEvents } from "../../../../utils/events.map";
import { pathRoutes } from "../../../../service/path-routes";

export const newViewer = (getViewers: (data: any) => void) => {
  socket.on(socketEvents.newViewerSession, (data: any) => {
    getViewers(data);
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

export const viewerLeftSession = (user_uuid: string, setViewers: any) => {
  socket.on(socketEvents.viewerLeftSession, (data: any) => {
    if (data?.user_uuid !== user_uuid) {
      setViewers((currentViewers: any) =>
        currentViewers?.filter((viewer: any) => {
          return viewer?.user_uuid !== data?.uuid;
        })
      );
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
    const { time, playing } = getTimerAndSend();
    socket.emit(socketEvents.responseTimeVideo, {
      to: data?.sender,
      current_time: time,
      playing: playing,
    });
  });
};

export const receiveTimeOfVideo = (
  syncTimer: (current_time: number, playing?: boolean) => void
) => {
  socket.on(socketEvents.currentTimeOfVideo, (data: any) => {
    syncTimer(data.current_time, data?.playing);
  });
};

export const handleEventChangeStatus = (
  session_uuid: string,
  event: string
) => {
  socket.emit(socketEvents.hostChangeStatusVideo, {
    session_uuid,
    event: event,
  });
};

export const receiveEventChangeStatus = (
  changeStatusVideo: any,
  session_uuid: string
) => {
  socket.on(socketEvents.receiveEventChangeStatusVideo, (data: any) => {
    if (data?.session_uuid !== session_uuid) return;
    if (data?.event === "play") changeStatusVideo(true);
    else if (data?.event === "pause") changeStatusVideo(false);
  });
};

export const changeVideoTime = (socket_room_uuid: string, time: any) => {
  socket.emit(socketEvents.hostChangeVideoTime, {
    room: socket_room_uuid,
    current_time: time,
  });
};

export const currentTimeUpdatedByHost = (setChangeCurrentTimeRequest: (time: any) => void) => {
  socket.on(socketEvents.videoCurrentTimeUpdated, (data: any) => {
    setChangeCurrentTimeRequest(data?.current_time);
  });
};
