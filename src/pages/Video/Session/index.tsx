import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Col, List, Row, Tooltip } from "antd";
import TimeAgo from "react-timeago";
import {
  CopyOutlined,
  CrownOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";

import * as S from "./styles";

import { apiRequest } from "../../../service/config-http";
import { pathRoutes } from "../../../service/path-routes";
import { useUser } from "../../../context/userContext";
import { useNotification } from "../../../context/notification";
import { Player } from "../../../components/Player";
import { newViewer, removedFromSession } from "./events";

export const SessionPlayer = () => {
  const { openNotification } = useNotification();
  const { userCredentials } = useUser();
  const navigate = useNavigate();
  const { session_id } = useParams();
  const [host, setHost] = useState<any[]>([]);
  const [viewers, setViewers] = useState<any[]>([]);
  const [isHostOfSession, setIsHostOfSession] = useState<boolean>(false);

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
        setSessionData(data?.sessionData);
        setHost(data?.viewers?.filter((viewer: any) => viewer?.creator));
        setViewers(data?.viewers?.filter((viewer: any) => !viewer?.creator));
      })
      .catch((error: any) => {
        if (error?.response?.status === 404) {
          openNotification(
            "error",
            "Ops...",
            error?.response?.data?.error ?? "Houve um erro ao buscar sessão"
          );
          navigate(pathRoutes.HOME);
          return
        }

        openNotification(
          "error",
          "Ops...",
          error?.response?.data?.message ?? "Houve um erro ao buscar sessão"
        );
        navigate(pathRoutes.HOME);
      });
  };

  const removeUser = async (user_uuid: string) => {
    const payload = {
      session_uuid: sessionData?.session_uuid,
      user_uuid: user_uuid,
    };

    await apiRequest
      .put(`/session/remove`, payload, {
        headers: {
          Authorization: `Bearer ${userCredentials?.accessToken}`,
        },
      })
      .catch((error: any) => {
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
    if (userCredentials?.uid) {
      newViewer(setViewers);
      removedFromSession(userCredentials?.uid, navigate);
    }
  }, [userCredentials?.uid]);

  useEffect(() => {
    if (host) {
      host?.forEach((host: any) => {
        if (host.uuid === userCredentials?.uid) {
          setIsHostOfSession(true);
        }
      });
    }
  }, [host]);

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
          showSyncButton={!isHostOfSession}
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
      <Col className="viewers-container" xs={24} sm={24} md={6} lg={6} xl={6}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <h4 className="title">
              Host <CrownOutlined style={{ color: "var(--orange-800)" }} />
            </h4>
            {host?.length > 0 && (
              <List
                className="list-viewers"
                itemLayout="horizontal"
                dataSource={host}
                renderItem={(host, index) => (
                  <List.Item key={index}>
                    <Avatar src={host?.avatar_url} />
                    <List.Item.Meta
                      className="username-viewers"
                      description={host?.username}
                    />
                    {isHostOfSession && (
                      <div className="viewers-container-actions">
                        <Button className="btn__action">Encerrar</Button>
                      </div>
                    )}
                  </List.Item>
                )}
              />
            )}
          </Col>
          <Col span={24}></Col>
          <Col span={24}>
            <h4 className="title">
              Viewers <EyeOutlined />
            </h4>
            {viewers?.length > 0 && (
              <List
                className="list-viewers"
                itemLayout="horizontal"
                dataSource={viewers}
                renderItem={(viewer, index) => (
                  <List.Item key={index}>
                    <Avatar src={viewer?.avatar_url || <UserOutlined />} />
                    <List.Item.Meta
                      className="username-viewers"
                      description={viewer?.username}
                    />
                    <div className="viewers-container-actions">
                      <Button
                        className="btn__action"
                        onClick={() => {
                          isHostOfSession
                            ? removeUser(viewer?.uuid)
                            : console.log("quitar");
                        }}
                      >
                        {isHostOfSession ? "Remover" : "Sair"}
                      </Button>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </Col>
        </Row>
      </Col>
    </S.Container>
  );
};
