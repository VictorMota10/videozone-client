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

import io from "socket.io-client";

import { SOCKET_IO_SERVER_URL } from "../../../service/utils";

import * as S from "./styles";

import { apiRequest } from "../../../service/config-http";
import { pathRoutes } from "../../../service/path-routes";
import { useUser } from "../../../context/userContext";
import { useNotification } from "../../../context/notification";
import { Player } from "../../../components/Player";
import {
  askVideoTime,
  handleEventChangeStatus,
  newViewer,
  receiveAskVideoTime,
  receiveEventChangeStatus,
  receiveTimeOfVideo,
  removedFromSession,
} from "./events";

const socket = io(SOCKET_IO_SERVER_URL);

export { socket };

export const SessionPlayer = () => {
  const videoContainer = document.getElementById(
    "video-player"
  ) as HTMLDivElement;
  const videoPlayer = videoContainer?.querySelector("video");

  const { openNotification } = useNotification();
  const { userCredentials } = useUser();
  const navigate = useNavigate();
  const { session_id } = useParams();

  const [host, setHost] = useState<any[]>([]);
  const [viewers, setViewers] = useState<any[]>([]);
  const [isHostOfSession, setIsHostOfSession] = useState<boolean | undefined>(
    undefined
  );
  const [playRequest, setPlayRequest] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<any>();

  const getSessionData = async () => {
    await apiRequest
      .get(`/session/${session_id}`, {
        headers: {
          Authorization: `Bearer ${userCredentials?.accessToken}`,
          SocketId: socket.id,
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
          openNotification("error", "Ops...", error?.response?.data?.error);
        } else {
          openNotification(
            "error",
            "Ops...",
            error?.response?.data?.message ?? "Houve um erro ao buscar sessão"
          );
        }

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
      .then(() => {
        const newViewers = viewers.filter(
          (viewer: any) => viewer?.uuid !== user_uuid
        );
        setViewers(newViewers);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getTimerAndSend = () => {
    return { time: videoPlayer?.currentTime, playing: !videoPlayer?.paused };
  };

  const syncTimer = (current_time: any, playing?: boolean) => {
    if (videoPlayer) {
      videoPlayer.muted = true;
      videoPlayer.currentTime = current_time;
      if (playing !== undefined) setPlayRequest(playing);
    }
  };

  const handleForceSync = () => {
    askVideoTime(host[0].socket_id, socket.id);
  };

  const handleHostChangeStatus = (event: string) => {
    handleEventChangeStatus(session_id || "", event);
  };

  const updateViewers = async () => {
    await apiRequest
      .get(`/session/viewers/${session_id}`, {
        headers: {
          Authorization: `Bearer ${userCredentials?.accessToken}`,
          SocketId: socket.id,
        },
      })
      .then((response) => {
        const { data } = response;
        setViewers(data);
      })
      .catch((error: any) => {
        openNotification(
          "error",
          "Ops...",
          "Houve um erro ao buscar viewers"
        );
      });
  }

  useEffect(() => {
    if (!session_id) navigate(pathRoutes.HOME);

    if (userCredentials?.accessToken) {
      if (socket.id) {
        getSessionData();
      } else {
        socket.on("connect", () => {
          getSessionData();
        });
      }
    }
  }, [userCredentials?.accessToken]);

  useEffect(() => {
    if (userCredentials?.uid) {
      newViewer(viewers, setViewers);
      removedFromSession(userCredentials?.uid, navigate, openNotification);
      receiveEventChangeStatus(setPlayRequest, session_id || "");

      if (isHostOfSession) {
        receiveAskVideoTime(getTimerAndSend);
      }

      if (isHostOfSession === false && videoPlayer && sessionData) {
        askVideoTime(host[0].socket_id, socket.id);
        receiveTimeOfVideo(syncTimer);
      }
    }
  }, [userCredentials?.uid, isHostOfSession, videoPlayer]);

  useEffect(() => {
    if (host) {
      host?.forEach((host: any) => {
        if (host.uuid === userCredentials?.uid) {
          setIsHostOfSession(true);
        } else {
          setIsHostOfSession(false);
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
          playRequestParent={playRequest}
          handleForceSync={handleForceSync}
          isHostOfSession={isHostOfSession}
          sendChangeVideoStatus={handleHostChangeStatus}
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
              <span id="session_link">{window.location.href}</span>
              <Tooltip title="Link copiado!" trigger="click">
                <Button
                  className="btn__copy"
                  onClick={async () => {
                    await navigator.clipboard.writeText(window.location.href);
                  }}
                >
                  <CopyOutlined size={24} />
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
                    <Avatar src={host?.avatar_url || <UserOutlined />} />
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
