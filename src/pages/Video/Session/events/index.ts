import { socket } from "../../../../App";
import { socketEvents } from "../../../../utils/events.map";

export const newViewer = (setViewers: any) => {
  socket.on(socketEvents.newViewerSession, (data: any) => {
    setViewers((prevState: any) => [...prevState, data]);
  });
};

export const removedFromSession = (user_uuid: string, navigate?: any) => {
  socket.on(socketEvents.removedFromSession, (data: any) => {
    if (data?.user_uuid === user_uuid) {
        alert('Voce foi removido')
    }
  });
};
