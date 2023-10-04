import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as S from "./styles";
import { Avatar, Col, List, Row, Skeleton } from "antd";
import ReactPlayer from "react-player";
import { apiRequest } from "../../../service/config-http";
import { VideoResponseProps } from "../../../interface/Video";
import { CardVideo } from "../../../components/CardVideo";

export const VideoPlayer = () => {
  const { video_uuid } = useParams();
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState<any>(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [videoData, setVideoData] = useState<VideoResponseProps>();

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

  const getRecommendedVideos = async () => {
    await apiRequest
      .get("videos")
      .then((response) => {
        const { data } = response;

        let newArrayData = data.slice(3);

        setRecommendedVideos(newArrayData.slice(0, 8));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getVideoUrl = async () => {
    await apiRequest
      .get(`video/url/${video_uuid}`)
      .then((response) => {
        const { data } = response;

        setVideoData(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRecommendedVideos();
    getVideoUrl();
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
          width="96%"
          height="72vh"
          controls={true}
          url={videoData?.video_url}
          config={{ file: { attributes: { controlsList: "nodownload" } } }}
        />
        <Row className="info-session">
          <Col span={24}>
            <h3>{videoData?.title}</h3>
          </Col>
          <Col span={24}>
            <h4>{videoData?.author}</h4>
          </Col>
        </Row>
      </Col>
      <Col
        className="users-session-container"
        xs={24}
        sm={24}
        md={6}
        lg={6}
        xl={6}
      >
        <h4 className="title">Recommended</h4>
        <Row gutter={[16, 16]}>
          {recommendedVideos?.map((video: VideoResponseProps, key: any) => {
            return (
              <Col className="gutter-row" span={24}>
                {!recommendedVideos ? (
                  <Skeleton.Input className="skeleton-card" active={true} />
                ) : (
                  <CardVideo videoData={video} channelData={{}} />
                )}
              </Col>
            );
          })}
        </Row>
      </Col>
    </S.Container>
  );
};
