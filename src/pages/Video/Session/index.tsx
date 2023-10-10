import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Col, Row } from "antd";
import TimeAgo from "react-timeago";

import * as S from "./styles";

import ReactPlayer from "react-player";
import { apiRequest } from "../../../service/config-http";
import { UserOutlined } from "@ant-design/icons";
import { pathRoutes } from "../../../service/path-routes";

export const SessionPlayer = () => {
  const navigate = useNavigate();
  const { session_id } = useParams();
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState<any>(null);
  const [sessionData, setSessionData] = useState<any>();

  function pausePlaying() {
    setPaused(true);
    if (timer) clearInterval(timer);
  }

  function getTimer() {
    const DivVideoPlayer: any = document.getElementById(
      "video-player"
    ) as HTMLDivElement;
    let timeVideoSession = DivVideoPlayer.firstChild.currentTime;
    console.log(timeVideoSession);
  }

  const getSessionData = async () => {
    await apiRequest
      .get(`session/${session_id}`)
      .then((response) => {
        const { data } = response;

        setSessionData(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!session_id) navigate(pathRoutes.HOME);

    getSessionData();
  }, []);

  return (
    <S.Container>
      <Col
        className="video-player-container"
        xs={24}
        sm={24}
        md={18}
        lg={18}
        xl={18}
      >
        <ReactPlayer
          onPlay={() => setPaused(false)}
          onPause={() => pausePlaying()}
          onStart={() => {
            setStarted(true);
          }}
          className="video-player"
          id="video-player"
          width="100%"
          height="72vh"
          controls={true}
          url={sessionData?.video_url}
          config={{ file: { attributes: { controlsList: "nodownload" } } }}
        />
        <Row className="info-session">
          <Col className="video-title-col" span={24}>
            <h3>{sessionData?.title}</h3>
            <TimeAgo
              className="create_at"
              date={new Date(sessionData?.create_at || "")}
            />
          </Col>
          <Col span={24}>
            <Avatar
              icon={
                sessionData?.channel_logo ? (
                  <img src={sessionData?.channel_logo} alt="channel logo" />
                ) : (
                  <UserOutlined />
                )
              }
            />
            <h4>{sessionData?.author}</h4>
          </Col>
        </Row>
        {/* <Row className="description-container">
          <Col span={24}>
            <h4>Description: </h4>
            <p>{sessionData?.description}</p>
          </Col>
        </Row> */}
      </Col>
      <Col
        className="recommended-container"
        xs={24}
        sm={24}
        md={6}
        lg={6}
        xl={6}
      >
        <h4 className="title">Viewers on session</h4>
        <Row gutter={[16, 16]}></Row>
      </Col>
    </S.Container>
  );
};
