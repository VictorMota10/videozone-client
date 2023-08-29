import React, { useEffect } from "react";

import { IMAGE_NOT_FOUND } from "../../utils/emptyResources";
import TimeAgo from "react-timeago";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { Avatar, Badge } from "antd";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

interface CardVideoProps {
  videoData: any;
  channelData: any;
}

export const CardVideo: React.FC<CardVideoProps> = ({
  videoData,
  channelData,
}: CardVideoProps) => {
  return (
    <div className="another-video-card">
      <img src={videoData.thumbnail_url || IMAGE_NOT_FOUND} alt="thumb" />
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
                  <img src={channelData.logo_url} alt="chanel-logo" /> || (
                    <FontAwesomeIcon icon={faUserAlt} />
                  )
                }
              />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
