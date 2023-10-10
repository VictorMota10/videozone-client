import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { realtime_db } from "../../infra/firebase-config";

import { ref, set } from "firebase/database";
import uuid from "react-uuid";

import { apiRequest } from "../../service/config-http";
import { Avatar, Badge, Col, Row, Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { CardVideo } from "../../components/CardVideo";
import { VideoResponseProps } from "../../interface/Video";
import { pathRoutes } from "../../service/path-routes";

import * as timeago from "timeago.js";
import TimeAgo from "timeago-react";
import pt_BR from "timeago.js/lib/lang/pt_BR";

export const Discover = () => {
  const navigate = useNavigate();
  timeago.register("pt_BR", pt_BR);

  const [discoveredVideos, setDiscoveredVideos] =
    useState<Array<VideoResponseProps>>();
  const [mainVideo, setMainVideo] = useState<VideoResponseProps>();
  const [secundaryVideo, setSecundaryVideo] = useState<VideoResponseProps>();
  const [thirdVideo, setThirdVideo] = useState<VideoResponseProps>();

  const getDiscoveredVideos = async () => {
    await apiRequest
      .get("videos")
      .then((response) => {
        const { data } = response;

        setMainVideo(data[0]);
        setSecundaryVideo(data[1]);
        setThirdVideo(data[2]);

        let newArrayData = data.slice(3);

        setDiscoveredVideos(newArrayData.slice(0, 8));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDiscoveredVideos();
  }, []);

  const goToVideoPlayer = (videoUuid?: string) => {
    navigate(`${pathRoutes.VIDEO_PLAYER}${videoUuid}`);
  };

  return (
    <>
      <S.DiscoverContainer>
        <S.VideosDiscoverContainer>
          <S.MainVideoContainer>
            {!mainVideo ? (
              <Skeleton.Input className="skeleton-loading" active={true} />
            ) : (
              <img
                onClick={() => goToVideoPlayer(mainVideo?.video_uuid_firebase)}
                className="thumbnail-img"
                src={mainVideo?.thumbnail_url}
                alt=""
              />
            )}
            <div className="author-container">
              <h3
                className="video-title"
                onClick={() => goToVideoPlayer(mainVideo?.video_uuid_firebase)}
              >
                {mainVideo?.title}
              </h3>

              <div className="author-info">
                <div className="video-infos">
                  {!mainVideo ? (
                    <Skeleton.Input active={true} />
                  ) : (
                    <>
                      <span className="author-name">{mainVideo?.tag_name}</span>
                      <TimeAgo
                        className="create-at"
                        datetime={new Date(mainVideo?.create_at || "")}
                        locale="pt_BR"
                      />
                    </>
                  )}
                </div>
                <Badge
                  className="verified-icon"
                  count={<FontAwesomeIcon icon={faCircleCheck} />}
                  offset={["-2%", "90%"]}
                >
                  <Avatar
                    onClick={() => navigate(`/channel/channel_id`)}
                    className="avatar-account"
                    size="large"
                    icon={
                      <img src={mainVideo?.logo_url} alt="chanel-logo" /> || (
                        <FontAwesomeIcon icon={faUserAlt} />
                      )
                    }
                  />
                </Badge>
              </div>
            </div>
          </S.MainVideoContainer>
          <S.SecundaryVideoContainer
            onClick={() => goToVideoPlayer(secundaryVideo?.video_uuid_firebase)}
          >
            {!mainVideo ? (
              <Skeleton.Input className="skeleton-loading" active={true} />
            ) : (
              <img
                className="thumbnail-img"
                src={secundaryVideo?.thumbnail_url}
                alt=""
              />
            )}
            <div className="author-container">
              <h3 className="video-title">{secundaryVideo?.title}</h3>
              <div className="author-info">
                <div className="video-infos">
                  <span className="author-name">
                    {secundaryVideo?.tag_name}
                  </span>
                  <TimeAgo
                    className="create-at"
                    datetime={new Date(secundaryVideo?.create_at || "")}
                    locale="pt_BR"
                  />
                </div>
                <Badge
                  className="verified-icon"
                  count={<FontAwesomeIcon icon={faCircleCheck} />}
                  offset={["-2%", "90%"]}
                >
                  <Avatar
                    className="avatar-account"
                    size="large"
                    icon={
                      (
                        <img src={secundaryVideo?.logo_url} alt="chanel-logo" />
                      ) || <FontAwesomeIcon icon={faUserAlt} />
                    }
                  />
                </Badge>
              </div>
            </div>
          </S.SecundaryVideoContainer>
          <S.ThirdVideoContainer
            onClick={() => goToVideoPlayer(thirdVideo?.video_uuid_firebase)}
          >
            {!mainVideo ? (
              <Skeleton.Input className="skeleton-loading" active={true} />
            ) : (
              <img
                className="thumbnail-img"
                src={thirdVideo?.thumbnail_url}
                alt=""
              />
            )}
            <div className="author-container">
              <h3 className="video-title">{thirdVideo?.title}</h3>
              <div className="author-info">
                <div className="video-infos">
                  <span className="author-name">{thirdVideo?.tag_name}</span>
                  <TimeAgo
                    className="create-at"
                    datetime={new Date(thirdVideo?.create_at || "")}
                    locale="pt_BR"
                  />
                </div>
                <Badge
                  className="verified-icon"
                  count={<FontAwesomeIcon icon={faCircleCheck} />}
                  offset={["-2%", "90%"]}
                >
                  <Avatar
                    className="avatar-account"
                    size="large"
                    icon={
                      <img src={thirdVideo?.logo_url} alt="chanel-logo" /> || (
                        <FontAwesomeIcon icon={faUserAlt} />
                      )
                    }
                  />
                </Badge>
              </div>
            </div>
          </S.ThirdVideoContainer>
        </S.VideosDiscoverContainer>
        <S.AnotherVideosContinainer>
          <Row gutter={[16, 24]}>
            {discoveredVideos?.map((video: VideoResponseProps, key: any) => {
              return (
                <Col key={key} className="gutter-row" sm={12} md={8} xl={6}>
                  {!discoveredVideos ? (
                    <Skeleton.Input className="skeleton-card" active={true} />
                  ) : (
                    <CardVideo videoData={video} channelData={{}} />
                  )}
                </Col>
              );
            })}
          </Row>
        </S.AnotherVideosContinainer>
      </S.DiscoverContainer>
    </>
  );
};
