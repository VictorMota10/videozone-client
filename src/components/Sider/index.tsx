import React, { useEffect, useState } from "react";
import "./styles.scss";

import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCompass } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/userContext";

const { Content, Footer, Sider } = Layout;

export const AntSider = ({ children }: { children: any }) => {
  const { userCredentials } = useUser();
  const navigate = useNavigate();

  const [blockModulesAuthenticated, setBlockModulesAuthenticated] =
    useState(false);
  const [activeOption, setActiveOption] = useState(["discover"]);

  const handleChangeOption = (key: string) => {
    setActiveOption([key]);
  };

  const handleSetOptionActiveMenu = () => {
    if (window.location.pathname === "/" || window.location.pathname === "") {
      setActiveOption(["discover"]);
      return;
    }

    if (window.location.pathname.includes("sessions")) {
      setActiveOption(["sessions"]);
      return;
    }

    if (window.location.pathname.includes("friends")) {
      setActiveOption(["friend-list"]);
      return;
    }

    setActiveOption([""]);
  };

  useEffect(() => {
    handleSetOptionActiveMenu();
  }, []);

  useEffect(() => {
    setBlockModulesAuthenticated(!userCredentials);
  }, [userCredentials]);

  useEffect(() => {
    handleSetOptionActiveMenu();
  }, [window.location.pathname]);

  return (
    <>
      <Sider
        style={{
          overflow: "auto",
          height: "94vh",
        }}
      >
        <article className="menu-sidebar">
          <aside>
            <section className="divider-area">
              <Menu
                theme="dark"
                selectedKeys={activeOption}
                onSelect={(e) => handleChangeOption(e.key)}
                mode="inline"
              >
                <Menu.Item
                  key="discover"
                  onClick={() => navigate("/")}
                  icon={
                    <div className="icon-container">
                      <FontAwesomeIcon icon={faCompass} />
                    </div>
                  }
                >
                  <span>Explorar</span>
                </Menu.Item>
                {!blockModulesAuthenticated && (
                  <>
                    <Menu.Item
                      key="sessions"
                      onClick={() => navigate("/sessions")}
                      icon={
                        <div className="icon-container">
                          <FontAwesomeIcon icon={faCalendar} />
                        </div>
                      }
                    >
                      <span>Sessões</span>
                    </Menu.Item>
                    <Menu.Item
                      key="friend-list"
                      onClick={() => navigate("/friends")}
                      icon={
                        <div className="icon-container">
                          <FontAwesomeIcon icon={faUserGroup} />
                        </div>
                      }
                    >
                      <span>Amigos</span>
                    </Menu.Item>
                  </>
                )}
              </Menu>
            </section>

            {!blockModulesAuthenticated && (
              <section className="divider-area">
                <p className="label-head-sider">Inscrições</p>
                <Menu theme="dark" mode="inline">
                  <Menu.Item
                    key="channel-1"
                    onClick={() => navigate("/")}
                    icon={
                      <div className="img-container">
                        <img
                          style={{ width: "100%" }}
                          alt="logo-channel"
                          src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fimages%20(1).png?alt=media&token=1b0b30bc-55f8-4f90-b272-b9386438e59d"
                        />
                      </div>
                    }
                  >
                    <span>Canal 1</span>
                  </Menu.Item>
                  <Menu.Item
                    key="channel-2"
                    onClick={() => navigate("/")}
                    icon={
                      <div className="img-container">
                        <img
                          style={{ width: "100%" }}
                          alt="logo-channel"
                          src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fimages%20(1).png?alt=media&token=1b0b30bc-55f8-4f90-b272-b9386438e59d"
                        />
                      </div>
                    }
                  >
                    <span>Canal 2</span>
                  </Menu.Item>
                  <Menu.Item
                    key="channel-3"
                    onClick={() => navigate("/")}
                    icon={
                      <div className="img-container">
                        <img
                          style={{ width: "100%" }}
                          alt="logo-channel"
                          src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fimages%20(1).png?alt=media&token=1b0b30bc-55f8-4f90-b272-b9386438e59d"
                        />
                      </div>
                    }
                  >
                    <span>Canal 3</span>
                  </Menu.Item>
                  <Menu.Item
                    key="channel-4"
                    onClick={() => navigate("/")}
                    icon={
                      <div className="img-container">
                        <img
                          style={{ width: "100%" }}
                          alt="logo-channel"
                          src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fimages%20(1).png?alt=media&token=1b0b30bc-55f8-4f90-b272-b9386438e59d"
                        />
                      </div>
                    }
                  >
                    <span>Channel 4</span>
                  </Menu.Item>
                </Menu>
              </section>
            )}

            <section className="divider-area">
              <p className="label-head-sider">Top canais</p>
              <Menu theme="dark" mode="inline">
                <Menu.Item
                  key="channel-1"
                  onClick={() => navigate("/")}
                  icon={
                    <div className="img-container">
                      <img
                        style={{ width: "100%" }}
                        alt="logo-channel"
                        src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fimages%20(1).png?alt=media&token=1b0b30bc-55f8-4f90-b272-b9386438e59d"
                      />
                    </div>
                  }
                >
                  <span>Channel 1</span>
                </Menu.Item>
                <Menu.Item
                  key="channel-2"
                  onClick={() => navigate("/")}
                  icon={
                    <div className="img-container">
                      <img
                        style={{ width: "100%" }}
                        alt="logo-channel"
                        src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fimages%20(1).png?alt=media&token=1b0b30bc-55f8-4f90-b272-b9386438e59d"
                      />
                    </div>
                  }
                >
                  <span>Channel 2</span>
                </Menu.Item>
                <Menu.Item
                  key="channel-3"
                  onClick={() => navigate("/")}
                  icon={
                    <div className="img-container">
                      <img
                        style={{ width: "100%" }}
                        alt="logo-channel"
                        src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fimages%20(1).png?alt=media&token=1b0b30bc-55f8-4f90-b272-b9386438e59d"
                      />
                    </div>
                  }
                >
                  <span>Channel 3</span>
                </Menu.Item>
                <Menu.Item
                  key="channel-4"
                  onClick={() => navigate("/")}
                  icon={
                    <div className="img-container">
                      <img
                        style={{ width: "100%" }}
                        alt="logo-channel"
                        src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fimages%20(1).png?alt=media&token=1b0b30bc-55f8-4f90-b272-b9386438e59d"
                      />
                    </div>
                  }
                >
                  <span>Channel 4</span>
                </Menu.Item>
              </Menu>
            </section>
          </aside>
        </article>
      </Sider>
      <Layout className="sider-content-layout">
        <Content style={{ margin: "1rem 0 1rem 2rem" }}>{children}</Content>
      </Layout>
    </>
  );
};
