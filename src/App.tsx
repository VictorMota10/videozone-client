import { AntSider } from "./components/Sider";
import { HeaderDefault } from "./components/Header";

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
