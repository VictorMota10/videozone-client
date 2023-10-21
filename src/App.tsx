import io from "socket.io-client";

import { SOCKET_IO_SERVER_URL } from "./service/utils";
import { AntSider } from "./components/Sider";
import { HeaderDefault } from "./components/Header";

const socket = io(SOCKET_IO_SERVER_URL);
socket.on("connect", () => {
  console.log("[IO] Connect");
});

export const App = ({
  children,
  noSider = false,
}: {
  children: JSX.Element;
  noSider?: boolean;
}) => {
  return (
    <HeaderDefault
      noSider={noSider}
      children={!noSider ? <AntSider children={children} /> : children}
    />
  );
};

export { socket };
