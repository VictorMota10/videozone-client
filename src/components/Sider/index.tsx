import React, { useEffect, useState } from "react";
import "./styles.scss";

import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCompass } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightToBracket, faArrowTrendUp, faUserGroup } from "@fortawesome/free-solid-svg-icons";

const { Content, Footer, Sider } = Layout;

export const AntSider = ({ children }: { children: any }) => {
  const navigate = useNavigate();

  const [blockModules, setBlockModules] = useState(false);

  const rootSubmenuKeys = ["subMenu1", "subMenu2", "subMenu3"];

  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <>
      <Sider
        style={{
          overflow: "auto",
          height: "92vh",
        }}
      >
        <article className="menu-sidebar">
          <section className="divider-area">
            <Menu
              theme="dark"
              defaultSelectedKeys={["explorer"]}
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
            >
              <Menu.Item
                key="explorer"
                onClick={() => navigate("/")}
                icon={<div className="icon-container"><FontAwesomeIcon icon={faCompass} /></div>}
              >
                <span>Explorer</span>
              </Menu.Item>
              <Menu.Item
                key="trending"
                onClick={() => navigate("/")}
                icon={<div className="icon-container"><FontAwesomeIcon icon={faArrowTrendUp} /></div>}
              >
                <span>Trending</span>
              </Menu.Item>
              <Menu.Item
                key="invites"
                onClick={() => navigate("/")}
                icon={<div className="icon-container"><FontAwesomeIcon icon={faCalendar} /></div>}
              >
                <span>Invites</span>
              </Menu.Item>
              <Menu.Item
                key="friend-list"
                onClick={() => navigate("/")}
                icon={<div className="icon-container"><FontAwesomeIcon icon={faUserGroup} /></div>}
              >
                <span>Friend List</span>
              </Menu.Item>
            </Menu>
          </section>

          <section className="divider-area">
            <p className="label-head-sider">Following</p>
            <Menu
              theme="dark"
              defaultSelectedKeys={["explorer"]}
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
            >
              <Menu.Item
                key="channel-1"
                onClick={() => navigate("/")}
                icon={<div className="img-container"><img style={{width: '100%'}} alt="logo-channel" src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fimages%20(1).png?alt=media&token=1b0b30bc-55f8-4f90-b272-b9386438e59d" /></div>}
              >
                <span>Channel 1</span>
              </Menu.Item>
              <Menu.Item
                key="channel-2"
                onClick={() => navigate("/")}
                icon={<div className="img-container"><img style={{width: '100%'}} alt="logo-channel" src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fimages%20(1).png?alt=media&token=1b0b30bc-55f8-4f90-b272-b9386438e59d" /></div>}
              >
                <span>Channel 2</span>
              </Menu.Item>
              <Menu.Item
                key="channel-3"
                onClick={() => navigate("/")}
                icon={<div className="img-container"><img style={{width: '100%'}} alt="logo-channel" src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fimages%20(1).png?alt=media&token=1b0b30bc-55f8-4f90-b272-b9386438e59d" /></div>}
              >
                <span>Channel 3</span>
              </Menu.Item>
              <Menu.Item
                key="channel-4"
                onClick={() => navigate("/")}
                icon={<div className="img-container"><img style={{width: '100%'}} alt="logo-channel" src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fimages%20(1).png?alt=media&token=1b0b30bc-55f8-4f90-b272-b9386438e59d" /></div>}
              >
                <span>Channel 4</span>
              </Menu.Item>
            </Menu>
          </section>

          <section className="divider-bottom-area">
            <Menu
              theme="dark"
              defaultSelectedKeys={["explorer"]}
              mode="inline"
              openKeys={openKeys}
              onOpenChange={onOpenChange}
            >
              <Menu.Item
                key="logout"
                onClick={() => navigate("/")}
                icon={<div className="icon-container"><FontAwesomeIcon icon={faArrowRightToBracket} /></div>}
              >
                <span>Logout</span>
              </Menu.Item>
            </Menu>
          </section>
        </article>
      </Sider>
      <Layout
        className="sider-content-layout"
      >
        <Content style={{ margin: '1rem 0 1rem 2rem' }}>
          {children}
        </Content>
      </Layout>
    </>
  );
};
