import { Row } from "antd";
import styled from "styled-components";

export const Container = styled(Row)`
  padding: 0 32px;
  width: 100%;
  height: 100%;

  .video-player-container {
    padding: 16px 0;

    .video-player {
      video {
        border-radius: 12px;
        border: 1px solid var(--blue-500);
      }
    }

    .info-session {
      .ant-col {
        display: flex;
        align-items: center;
      }

      h4,
      h3 {
        margin: 0;
        padding: 8px;
      }

      h4 {
        font-size: 14px;
        font-weight: 300;
        color: var(--text-gray);
      }

      h3 {
        font-size: 16px;
        font-weight: 500;
        color: var(--text-white);
      }
    }
  }

  .users-session-container {
    padding: 16px 0;

    .title {
      padding: 8px 0;
      font-size: 14px;
      font-weight: 300;
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
