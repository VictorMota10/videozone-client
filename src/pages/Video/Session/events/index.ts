import { socket } from "../../../../App";
import { socketEvents } from "../../../../utils/events.map";

export const newViewer = (setViewers: any) => {
  socket.on(socketEvents.newViewerSession, (data: any) => {
    setViewers((prevState: any) => [...prevState, data]);
  });
};
