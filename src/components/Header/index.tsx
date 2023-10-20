import react, { useEffect, useState } from "react";
import {
  Layout,
  Input,
  Avatar,
  Dropdown,
  MenuProps,
  Space,
  Button,
} from "antd";

import Logo from "../../assets/logo-no-background.png";

import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { UserDataLogged } from "../../interface/User";
import { pathRoutes } from "../../service/path-routes";
import { IMAGE_NOT_FOUND } from "../../utils/emptyResources";

const { Header } = Layout;
const { Search } = Input;

export const HeaderDefault = ({
  children,
  noSider,
}: {
  children: JSX.Element;
  noSider: boolean;
}) => {
  const navigate = useNavigate();

  const { setUserCredentials, userCredentials, handleLogout } = useUser();

  const items: MenuProps["items"] = [
    {
      label: (
        <span
          className="user-menu-option"
          onClick={() => navigate("/my-channels")}
        >
          Meus Canais
        </span>
      ),
      key: "0",
    },
    {
      label: (
        <span
          className="user-menu-option"
          onClick={() => navigate("/account-details")}
        >
          Detalhes da conta
        </span>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a className="logout" onClick={handleLogout}>
          Sair
        </a>
      ),
      key: "3",
    },
  ];

  const handlePersistUserDataInContext = (userData: UserDataLogged) => {
    setUserCredentials({
      email: userData.email,
      uid: userData.uid,
      accessToken: userData.accessToken,
      username: userData.username,
      avatarUrl: userData?.avatarUrl,
      accessTokenFirebase: userData.accessTokenFirebase,
      refreshToken: userData.refreshToken,
    });
  };

  useEffect(() => {
    let userDataStorage = localStorage.getItem("userData");
    if (userDataStorage) {
      handlePersistUserDataInContext(JSON.parse(userDataStorage));
    }
  }, []);

  return (
    <Layout className="layout-header">
      <Header className="header">
        <div className="area-logo-img">
          <img className="logo-img" onClick={() => navigate(pathRoutes.HOME)} src={Logo} alt="logo-videozone" />
        </div>
        <div className="container-search">
          <Search
            className="search-input"
            placeholder="Procurar"
            allowClear
            onSearch={() => console.log("teste")}
            style={{ width: 200 }}
          />
        </div>
        <div className="container-account">
          {userCredentials ? (
            <>
              <Avatar
                className="avatar-account"
                size="large"
                icon={
                  userCredentials?.avatarUrl ? (
                    <img src={userCredentials?.avatarUrl} alt="user_img" />
                  ) : (
                    <FontAwesomeIcon icon={faUserAlt} />
                  )
                }
              />
              <Dropdown
                className="salute-user"
                menu={{ items }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Olá, {userCredentials.username}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </>
          ) : (
            <div className="auth-container">
              <Button
                className="login-button"
                onClick={() => navigate("/sign-in")}
              >
                Login
              </Button>
              <Button
                className="register-button"
                onClick={() => navigate("/register")}
              >
                Registrar-se
              </Button>
            </div>
          )}
        </div>
      </Header>
      <Layout
        style={{
          background: "var(--blue-900)",
          padding: noSider ? "64px 0 0" : "",
        }}
      >
        {children}
      </Layout>
    </Layout>
  );
};
