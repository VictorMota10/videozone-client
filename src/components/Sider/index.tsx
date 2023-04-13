import React, { useEffect, useState } from "react";
import "./styles.scss";

import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-regular-svg-icons";

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
          <section className="top-area">
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
            </Menu>
          </section>
        </article>
      </Sider>
      <Layout
        className="sider-content-layout"
      >
        <Content style={{ margin: '1rem 2rem', border: '1px solid white' }}>
          {children}
        </Content>
      </Layout>
    </>
  );
};
