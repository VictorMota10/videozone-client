import { Col, Slider } from "antd";
import ReactPlayer, {
  ReactPlayerProps as ReactPlayerPropsLib,
} from "react-player";
import { useEffect, useState } from "react";

import {
  CaretRightOutlined,
  FullscreenOutlined,
  PauseOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import * as S from "./styles";

import VideoTemplate from "../../assets/video-template.mp4";

interface ReactPlayerProps extends ReactPlayerPropsLib {
  showSyncButton?: boolean;
  handleForceSync: any;
  playRequestParent?: boolean;
  isHostOfSession?: boolean;
  sendChangeVideoStatus?: any;
  changeCurrentTimeRequestParent?: any;
  handleChangeCurrentTime?: any;
  socket_room_uuid?: string
}

export const Player = ({ ...props }: ReactPlayerProps) => {
  const [videoError, setVideoError] = useState(false);
  const [maxTimeVideo, setMaxTimeVideo] = useState<any>();
  const [currentTimeVideo, setCurrentTimeVideo] = useState<any>(0);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(10);
  const [fullScreen, setFullScreen] = useState(false);

  const videoContainer = document?.getElementById(
    "video-player"
  ) as HTMLDivElement;
  const videoPlayer = videoContainer?.querySelector("video");

  const onChangeTime = (e: any) => {
    if (videoPlayer) videoPlayer.currentTime = e;
  };

  const handlePlay = () => {
    setPlaying(true);
    setPaused(false);

    if (props.onPlay) {
      props.onPlay();
    }

    if (props.isHostOfSession && props.sendChangeVideoStatus) {
      props.sendChangeVideoStatus("play");
    }

    if (!started) setStarted(true);

    videoPlayer?.play();
    const controlElement = document.getElementById("control-player");

    if (controlElement) {
      controlElement.classList.add("started-hide-controls");
    }
  };

  const handlePause = () => {
    setPaused(true);
    setPlaying(false);

    if (props.onPause) {
      props.onPause();
    }

    if (props.isHostOfSession && props.sendChangeVideoStatus) {
      props.sendChangeVideoStatus("pause");
    }

    videoPlayer?.pause();

    const controlElement = document.getElementById("control-player");

    if (controlElement) {
      controlElement.classList?.remove("started-hide-controls");
    }
  };

  const handleFullScreen = () => {
    if (fullScreen) {
      setFullScreen(false);
      videoContainer.classList.remove("fullscreen");
    } else {
      setFullScreen(true);
      videoContainer.classList.add("fullscreen");
    }
  };

  document.addEventListener("keydown", (e) => {
    if (fullScreen && e.key === "Escape") {
      handleFullScreen();
    }
  });

  useEffect(() => {
    if (props.playRequestParent) {
      handlePlay();
    } else {
      handlePause();
    }
  }, [props.playRequestParent]);

  useEffect(() => {
    if (videoPlayer?.muted) setVolume(0);

    if (volume > 0 && videoPlayer) {
      videoPlayer.muted = false;
    }
  }, [videoPlayer, volume]);

  useEffect(() => {
    if (!props.isHostOfSession && videoPlayer) {
      videoPlayer.currentTime = props.changeCurrentTimeRequestParent
    }
  }, [props.changeCurrentTimeRequestParent])

  return (
    <S.Container>
      <Col
        className="video-player-container"
        onClick={(e) => {
          let element = e.target as HTMLElement;
          if (element.tagName === "VIDEO") {
            if ((!playing && !started) || (started && paused)) handlePlay();
            else handlePause();
          }
        }}
        span={24}
      >
        <ReactPlayer
          onDuration={(e) => setMaxTimeVideo(e)}
          onProgress={(e) => {
            setCurrentTimeVideo(e.playedSeconds);

          }}
          onPause={handlePause}
          onPlay={handlePlay}
          id="video-player"
          {...props}
          controls={false}
          volume={volume / 100}
          url={videoError ? props.url : VideoTemplate}
          onError={(e) => {
            if (e.type === "error") {
              setVideoError(true);
            }
          }}
          onSeek={(time: number) => {
            if (props.handleChangeCurrentTime && props.isHostOfSession) {
              props.handleChangeCurrentTime(props.socket_room_uuid, time)
            }
          }}
        />
        <S.Controls id="control-player">
          <Col className="slider-progress-container" span={24}>
            <Slider
              className="progressbar-video"
              onChange={(e) => onChangeTime(e)}
              tooltip={{ open: false }}
              max={maxTimeVideo}
              value={currentTimeVideo}
              step={0.01}
            />
          </Col>

          <S.ButtonsControl>
            <Col className="control-buttons-container" span={6}>
              <Col span={5}>
                <button
                  type="button"
                  className="control-btn__play"
                  id="play-video"
                  onClick={() =>
                    (!playing && !started) || (started && paused)
                      ? handlePlay()
                      : handlePause()
                  }
                >
                  {(!playing && !started) || (started && paused) ? (
                    <CaretRightOutlined />
                  ) : (
                    <PauseOutlined />
                  )}
                </button>
              </Col>
              <Col span={10}>
                <Slider
                  className="volume-control"
                  onChange={(e) => setVolume(e)}
                  tooltip={{ open: false }}
                  max={100}
                  value={volume}
                />
              </Col>
            </Col>

            <Col className="final-container" span={10}>
              {props.showSyncButton && (
                <button
                  type="button"
                  className="control-btn__sync"
                  onClick={props.handleForceSync}
                >
                  <SyncOutlined /> Sincronizar Tempo
                </button>
              )}
              <button
                type="button"
                className="control-btn__fullscreen"
                onClick={handleFullScreen}
              >
                <FullscreenOutlined />
              </button>
            </Col>
          </S.ButtonsControl>
        </S.Controls>
      </Col>
    </S.Container>
  );
};
