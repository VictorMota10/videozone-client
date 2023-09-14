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

const { Header } = Layout;
const { Search } = Input;

export const HeaderDefault = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  const { setUserCredentials, userCredentials, handleLogout } = useUser();

  const items: MenuProps["items"] = [
    {
      label: (
        <span
          className="user-menu-option"
          onClick={() => navigate("/my-channels")}
        >
          My Channels
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
          Account details
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
          Logout
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
          <img className="logo-img" src={Logo} alt="logo-videozone" />
        </div>
        <div className="container-search">
          <Search
            className="search-input"
            placeholder="Search"
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
                    Hi, {userCredentials.username}
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
                Register
              </Button>
            </div>
          )}
        </div>
      </Header>
      <Layout style={{ background: "red" }}>{children}</Layout>
    </Layout>
  );
};
