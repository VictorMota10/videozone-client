import { Row } from "antd";
import styled from "styled-components";

export const Container = styled(Row)`
  padding: 0 16px 0 24px;
  width: 100%;
  height: 100%;

  .video-player-container {
    padding: 16px 24px 0 0;

    .video-player {
      video {
        border-radius: 12px;
        border: 1px solid var(--blue-500);
        :hover {
          cursor: pointer;
        }
      }
    }

    .info-session {
      .video-title-col {
        justify-content: space-between;

        .create_at {
          font-size: 12px;
          color: var(--text-gray);
          font-weight: 300;
          padding-right: 8px;
        }
      }

      .channel_info {
        display: flex;
        justify-content: space-between;

        .avatar_channel {
          display: flex;
        }

        .button_session {
          border: none;
          background-color: var(--orange-800);
          color: var(--text-white);
        }
      }

      .ant-col {
        display: flex;
        align-items: center;
      }

      h4 {
        margin: 0;
        padding: 8px;
        font-size: 14px;
        font-weight: 300;
        color: var(--text-gray);
      }

      h3 {
        margin: 0;
        padding: 16px 0 8px;
        font-size: 16px;
        font-weight: 500;
        color: var(--text-white);
      }
    }

    .description-container {
      display: flex;
      flex-direction: column;
      border-top: 1px solid var(--blue-500);
      margin: 16px 0 0;
      padding: 0;

      h4 {
        padding: 8px 0 0;
        margin: 0;
      }
    }
  }

  .recommended-container {
    padding: 16px 0;
    overflow: hidden;

    .title {
      padding: 0 0 16px;
      font-size: 14px;
      font-weight: 300;
      margin: 0;
    }

    .list-users {
      .ant-list-item {
        padding: 12px 0;

        .ant-list-item-meta {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;

          .ant-list-item-meta-title {
            margin: 0;
            padding: 0;
            font-weight: 300;
            font-size: 14px;
            color: var(--text-gray) !important;
          }
        }
      }
    }
  }
`;
