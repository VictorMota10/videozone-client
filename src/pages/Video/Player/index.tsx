import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Col, Row, Skeleton } from "antd";
import TimeAgo from "react-timeago";
import { UserOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";

import * as S from "./styles";

import { apiRequest } from "../../../service/config-http";
import { VideoResponseProps } from "../../../interface/Video";
import { CardVideo } from "../../../components/CardVideo";
import { pathRoutes } from "../../../service/path-routes";

export const VideoPlayer = () => {
  const navigate = useNavigate();
  const { video_uuid } = useParams();
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [videoData, setVideoData] = useState<VideoResponseProps>();

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
      .get(`video/${video_uuid}`)
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
          className="video-player"
          id="video-player"
          width="100%"
          height="72vh"
          controls={true}
          url={videoData?.video_url}
          config={{ file: { attributes: { controlsList: "nodownload" } } }}
        />
        <Row className="info-session">
          <Col className="video-title-col" span={24}>
            <h3>{videoData?.title}</h3>
            <TimeAgo
              className="create_at"
              date={new Date(videoData?.create_at || "")}
            />
          </Col>
          <Col className="channel_info" span={24}>
            <div className="avatar_channel">
              <Avatar
                icon={
                  videoData?.channel_logo ? (
                    <img src={videoData?.channel_logo} alt="channel logo" />
                  ) : (
                    <UserOutlined />
                  )
                }
              />
              <h4>{videoData?.author}</h4>
            </div>
            <Button
              className="button_session"
              onClick={() => navigate(pathRoutes.NEW_SESSION(video_uuid || ""))}
            >
              Criar Sessão
            </Button>
          </Col>
        </Row>
        <Row className="description-container">
          <Col span={24}>
            <h4>Descrição: </h4>
            <p>{videoData?.description}</p>
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
        <h4 className="title">Recommended</h4>
        <Row gutter={[16, 16]}>
          {recommendedVideos?.map((video: VideoResponseProps, key: any) => {
            return (
              <Col key={key} className="gutter-row" span={24}>
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
