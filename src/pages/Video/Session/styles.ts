import { Row } from "antd";
import styled from "styled-components";

export const Container = styled(Row)`
  padding: 0 16px 0 24px;
  width: 100%;
  height: 100%;

  .container-player {
    padding: 16px 16px 0 0;
  }

  .info-session {
    .session-share {
      display: flex;
      padding: 8px 0;
      justify-content: end;
      .container-session-share {
        border: 1px solid var(--blue-500);
        padding: 4px 4px 4px 8px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 70%;

        > span {
          width: 80%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .btn__copy {
          background-color: var(--orange-800);
          color: white;
          border: none !important;

          &:hover,
          &:focus {
            background-color: var(--orange-900);
            color: white;
            border: none !important;
          }
        }
      }
    }
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

  .viewers-container {
    padding: 16px 0;
    overflow: hidden;

    .title {
      padding: 0 0 16px;
      font-size: 14px;
      font-weight: 300;
      margin: 0;
    }

    .list-viewers {
      .username-viewers {
        padding: 0 8px !important;

        .ant-list-item-meta-description {
          color: var(--text-white) !important;
        }
      }

      .btn__action {
        background-color: var(--red-900);
        border: none;
        color: var(--text-white);
      }
    }
  }
`;
