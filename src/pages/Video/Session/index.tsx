import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Col, Row, Slider } from "antd";
import TimeAgo from "react-timeago";

import * as S from "./styles";

import ReactPlayer from "react-player";
import { apiRequest } from "../../../service/config-http";
import {
  CaretRightOutlined,
  FullscreenOutlined,
  PauseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { pathRoutes } from "../../../service/path-routes";
import { useUser } from "../../../context/userContext";
import { useNotification } from "../../../context/notification";
import { Player } from "../../../components/Player";

export const SessionPlayer = () => {
  const { openNotification } = useNotification();
  const { userCredentials } = useUser();
  const navigate = useNavigate();
  const { session_id } = useParams();

  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [maxTimeVideo, setMaxTimeVideo] = useState<any>();
  const [timer, setTimer] = useState<any>(null);
  const [sessionData, setSessionData] = useState<any>();
  const [currentTimeVideo, setCurrentTimeVideo] = useState<any>();

  const videoContainer = document?.getElementById(
    "video-player"
  ) as HTMLDivElement;
  const videoPlayer = videoContainer?.querySelector("video");

  function pausePlaying() {
    setPaused(true);
    if (timer) clearInterval(timer);
  }

  function getTimer() {
    const videoContainer = document.getElementById(
      "video-player"
    ) as HTMLDivElement;
    const videoPlayer = videoContainer.querySelector("video");
    if (videoPlayer) {
      console.log(videoPlayer.duration);
    }
  }

  function getTimeLengthVideo() {
    const videoContainer = document.getElementById(
      "video-player"
    ) as HTMLDivElement;
    const videoPlayer = videoContainer.querySelector("video");
    if (videoPlayer) {
      setMaxTimeVideo(parseFloat(videoPlayer.duration.toString()).toFixed(2));
    }
  }

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

  const playVideo = () => {
    const videoContainer = document.getElementById(
      "video-player"
    ) as HTMLDivElement;
    const videoPlayer = videoContainer.querySelector("video");

    setPlaying(true);
    setStarted(true);
    videoPlayer?.play();
  };

  const pauseVideo = () => {
    if (videoPlayer) {
      setPlaying(true);
      setPaused(true);
      videoPlayer?.pause();
    }
  };

  const volume = (e: any) => {
    if (videoPlayer) videoPlayer.volume = e / 100;
  };

  const onChangeTime = (e: any) => {
    if (videoPlayer) videoPlayer.currentTime = e;
  };

  const updateTimer = () => {
    if (videoPlayer) {
      setCurrentTimeVideo(videoPlayer.currentTime);
    }
  };

  const fullScreen = () => {
    videoContainer.classList.add("fullscreen");
  };

  videoPlayer?.addEventListener("timeupdate", () => {
    updateTimer();
  });

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
        <Player
          onPlay={() => setPaused(false)}
          onPause={() => pausePlaying()}
          onStart={() => {
            setStarted(true);
          }}
          className="video-player"
          id="video-player"
          width="100%"
          height="72vh"
          url={sessionData?.video_url}
          config={{
            file: { attributes: { controlsList: ["nodownload"] } },
          }}
        />
        {/* <Player
          onPlay={() => setPaused(false)}
          onPause={() => pausePlaying()}
          onStart={() => {
            setStarted(true);
          }}
          className="video-player"
          id="video-player"
          width="100%"
          height="72vh"
          url={sessionData?.video_url}
          config={{
            file: { attributes: { controlsList: ["nodownload"] } },
          }}
        />

        <Row className="controls-video">
          <Col span={24}>
            <Slider
              className="progress-video"
              onChange={(e) => onChangeTime(e)}
              tooltip={{ open: false }}
              max={maxTimeVideo}
              value={currentTimeVideo}
              step={0.01}
            />
          </Col>
          <Col span={19}>
            {sessionData?.creator_user_uuid === userCredentials?.uid && (
              <button
                type="button"
                onClick={() =>
                  (!playing && started) || (started && !paused)
                    ? pauseVideo()
                    : playVideo()
                }
              >
                {(!playing && started) || (started && !paused) ? (
                  <PauseOutlined />
                ) : (
                  <CaretRightOutlined />
                )}
              </button>
            )}
          </Col>

          <Col span={1}></Col>
          <Col style={{ justifyContent: "end" }} span={2}>
            <Slider
              onChange={(e) => volume(e)}
              defaultValue={30}
              tooltip={{ open: false }}
            />
          </Col>
          <Col style={{ display: "flex", justifyContent: "flex-end" }} span={2}>
            <button type="button" onClick={() => fullScreen()}>
              <FullscreenOutlined />
            </button>
          </Col>
        </Row> */}
        <Row className="info-session">
          <Col className="video-title-col" span={24}>
            <h3>{sessionData?.title}</h3>
            <TimeAgo
              className="create_at"
              date={new Date(sessionData?.create_at || "")}
            />
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
        <h4 className="title">Viewers on session</h4>
        <Row gutter={[16, 16]}></Row>
      </Col>
    </S.Container>
  );
};
