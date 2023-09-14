import React, { useEffect } from "react";

import * as S from "./styles";

import TimeAgo from "react-timeago";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { Avatar, Badge } from "antd";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

import { IMAGE_NOT_FOUND } from "../../utils/emptyResources";
import { useNavigate } from "react-router-dom";
import { pathRoutes } from "../../service/path-routes";
import { VideoResponseProps } from "../../interface/Video";

interface CardVideoProps {
  videoData: VideoResponseProps;
  channelData: any;
}

export const CardVideo: React.FC<CardVideoProps> = ({
  videoData,
  channelData,
}: CardVideoProps) => {
  const navigate = useNavigate();

  return (
    <S.CardVideo>
      <img
        src={videoData.thumbnail_url || IMAGE_NOT_FOUND}
        alt="thumb"
        onClick={() => navigate(`${pathRoutes.VIDEO_PLAYER}${videoData.video_uuid_firebase}`)}
      />
      <div className="info-video">
        <div className="details">
          <div className="channel-and-time">
            <span>{channelData?.name}</span>
            <p> - </p>
            <TimeAgo
              className="create-at"
              date={new Date(videoData.create_at || "")}
            />
          </div>
          <h3>{videoData.title}</h3>
        </div>
        <div className="author-avatar">
          <div className="circle-avatar">
            <Badge
              className="verified-icon"
              count={<FontAwesomeIcon icon={faCircleCheck} />}
              offset={["-2%", "96%"]}
            >
              <Avatar
                className="avatar-account-video"
                size="large"
                icon={
                  <img src={videoData?.logo_url} alt="chanel-logo" /> || (
                    <FontAwesomeIcon icon={faUserAlt} />
                  )
                }
              />
            </Badge>
          </div>
        </div>
      </div>
    </S.CardVideo>
  );
};
