import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Col, Row, Tooltip } from "antd";
import TimeAgo from "react-timeago";
import { CopyOutlined, UserOutlined } from "@ant-design/icons";

import * as S from "./styles";

import { apiRequest } from "../../../service/config-http";
import { pathRoutes } from "../../../service/path-routes";
import { useUser } from "../../../context/userContext";
import { useNotification } from "../../../context/notification";
import { Player } from "../../../components/Player";
import { newViewer } from "./events";

export const SessionPlayer = () => {
  const { openNotification } = useNotification();
  const { userCredentials } = useUser();
  const navigate = useNavigate();
  const { session_id } = useParams();
  const [viewers, setViewers] = useState<any[]>([]);

  const [sessionData, setSessionData] = useState<any>();

  const getSessionData = async () => {
    await apiRequest
      .get(`/session/${session_id}`, {
        headers: {
          Authorization: `Bearer ${userCredentials?.accessToken}`,
        },
      })
      .then((response) => {
        const { data } = response;
        setSessionData(data);
      })
      .catch((error: any) => {
        if (error?.response?.status === 404) {
          openNotification(
            "error",
            "Ops...",
            error?.response?.data?.error ?? "Houve um erro ao buscar sessão"
          );
          navigate(pathRoutes.HOME);
        }
        console.log(error);
      });
  };

  useEffect(() => {
    if (!session_id) navigate(pathRoutes.HOME);

    if (userCredentials?.accessToken) {
      getSessionData();
    }
  }, [userCredentials?.accessToken]);

  useEffect(() => {
    newViewer(setViewers);
  }, []);

  useEffect(() => {
    console.log(viewers)
  }, [viewers])

  return (
    <S.Container>
      <Col className="container-player" xs={24} sm={24} md={18} lg={18} xl={18}>
        <Player
          className="video-player"
          id="video-player"
          width="100%"
          height="72vh"
          url={sessionData?.video_url}
          config={{
            file: { attributes: { controlsList: ["nodownload"] } },
          }}
        />
        <Row className="info-session">
          <Col className="video-title-col" span={12}>
            <h3>{sessionData?.title}</h3>
            <TimeAgo
              className="create_at"
              date={new Date(sessionData?.create_at || "")}
            />
          </Col>
          <Col className="session-share" span={12}>
            <h4>Link da sessão: </h4>
            <div className="container-session-share">
              <span>{window.location.href}</span>
              <Tooltip title="Link copiado!" trigger="click">
                <Button className="btn__copy">
                  <CopyOutlined
                    size={24}
                    onClick={async () =>
                      await navigator.clipboard.writeText(window.location.href)
                    }
                  />
                </Button>
              </Tooltip>
            </div>
          </Col>
          <Col className="channel_info" span={24}>
            <div className="avatar_channel">
              <Avatar
                icon={
                  sessionData?.logo_url ? (
                    <img src={sessionData?.logo_url} alt="channel logo" />
                  ) : (
                    <UserOutlined />
                  )
                }
              />
              <h4>{sessionData?.name}</h4>
            </div>
          </Col>
        </Row>
      </Col>
      <Col
        className="recommended-container"
        xs={24}
        sm={24}
        md={6}
        lg={6}
        xl={6}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <h4 className="title">Host</h4>
          </Col>
          <Col span={24}></Col>
          <Col span={24}>
            <h4 className="title">Viewers on session</h4>
          </Col>
        </Row>
      </Col>
    </S.Container>
  );
};
