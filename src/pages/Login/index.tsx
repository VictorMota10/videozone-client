import react, { useState } from "react";
import "./styles.scss";

import Logo from "../../assets/logo-no-background.png";

import { FormProvider, useForm } from "react-hook-form";
import { Button, Col, Row, Space } from "antd";
import { Input } from "../../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { apiRequest } from "../../service/config-http";
import { useUser } from "../../context/userContext";
import { UserDataLogin } from "../../interface/User";
import { useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const { setUserCredentials } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const methods = useForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  let redirect = location?.state?.redirect;

  const [loadingLogin, setLoadingLogin] = useState(false);

  const handleSaveNavigatorUserData = (userData: UserDataLogin) => {
    setUserCredentials({
      email: userData.userDataFirebase.user.email,
      uid: userData.userDataFirebase.user.uid,
      accessTokenFirebase:
        userData.userDataFirebase.user.stsTokenManager.accessToken,
      username: userData.userDataPostgres.username,
      avatarUrl: userData.userDataPostgres?.avatar_url || undefined,
      accessToken: userData.token,
      refreshToken: userData.refreshToken,
    });

    localStorage.setItem(
      "userData",
      JSON.stringify({
        email: userData.userDataFirebase.user.email,
        uid: userData.userDataFirebase.user.uid,
        accessTokenFirebase:
          userData.userDataFirebase.user.stsTokenManager.accessToken,
        username: userData.userDataPostgres.username,
        avatarUrl: userData.userDataPostgres?.avatar_url || undefined,
        accessToken: userData.token,
        refreshToken: userData.refreshToken,
      })
    );
  };

  const handleLogin = async (data: any) => {
    setLoadingLogin(true);
    await apiRequest
      .post("/sign-in", data)
      .then((response: any) => {
        handleSaveNavigatorUserData(response.data);
        navigate(redirect ? redirect : "/");
        setLoadingLogin(false);
      })
      .catch((error: any) => {
        console.error(error);
        setLoadingLogin(false);
      });
  };

  return (
    <div className="background-container">
      <article className="container-login">
        <img className="logo-img" src={Logo} alt="logo-videozone" />

        <FormProvider {...methods}>
          <form className="form-login" onSubmit={handleSubmit(handleLogin)}>
            <Space
              className="space__login"
              direction="vertical"
              size={30}
              style={{ display: "flex" }}
            >
              <Row style={{ width: "100%" }}>
                <Col span={24}>
                  <Input
                    name="email"
                    label="Email"
                    labelColor="var(--text-gray)"
                    required
                    type="email"
                    maxLength={80}
                    placeholder="Type your email..."
                    autoComplete="off"
                    prefix={<FontAwesomeIcon icon={faEnvelope} />}
                  />
                </Col>
              </Row>

              <Row style={{ width: "100%" }}>
                <Col span={24}>
                  <Input
                    name="password"
                    label="Password"
                    labelColor="var(--text-gray)"
                    required
                    type="password"
                    minLength={6}
                    maxLength={30}
                    placeholder="Type your passord..."
                    autoComplete="off"
                    prefix={<FontAwesomeIcon icon={faKey} />}
                  />
                </Col>
              </Row>
            </Space>

            <Row style={{ width: "100%" }}>
              <Col span={24}>
                <a className="forgot-password">Forgot your password?</a>
              </Col>
            </Row>

            <Space
              className="space__login"
              direction="vertical"
              size={30}
              style={{ display: "flex" }}
            >
              <Row style={{ width: "100%" }}>
                <Col span={24}>
                  <Button
                    htmlType="submit"
                    className="btn-login"
                    type="primary"
                    loading={loadingLogin}
                  >
                    Login
                  </Button>
                </Col>
              </Row>

              <Row style={{ width: "100%" }}>
                <Col span={24}>
                  <Button
                    onClick={() => navigate("/register")}
                    className="btn-register_login-page"
                    type="primary"
                  >
                    Register
                  </Button>
                </Col>
              </Row>
            </Space>
          </form>
        </FormProvider>
      </article>
    </div>
  );
};
