import styled from "styled-components";

export const ContainerContent = styled.div`
  height: 100%;

  h3 {
    font-size: 1.4rem;
    padding: 0 !important;
    margin: 0 !important;
    color: var(--text-gray);
    font-weight: 500;
  }
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

export const MiddleContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1rem;

  .button_new-video {
    background-color: var(--orange-800);
    border: none;
    color: var(--text-white);
    font-weight: 600;
    font-size: 0.9rem;
    width: 12rem;

    &:hover {
      color: var(--text-white);
      opacity: 0.8;
    }
  }
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 1rem;
  flex-direction: column;

  .ant-tabs {
    width: 100%;

    .ant-tabs-tab-disabled div {
      color: var(--blue-600) !important;
    }

    .ant-tabs-nav::before {
      border-bottom: 1px solid var(--text-gray) !important;
    }

    .ant-tabs-content {
      .another-video-card {
    border-radius: 20px;
    height: 18rem;
    display: flex;
    flex-direction: column;

    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }

    img {
      border-radius: 20px 20px 0 0;
      width: 100%;
      height: 75%;
      background: black;
      opacity: 0.8;
    }

    .info-video {
      background: #242730;
      width: 100%;
      height: 25%;
      border-radius: 0 0 20px 20px;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: space-between;

      .details {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .channel-and-time {
          display: flex;

          p {
            color: var(--text-gray);
            margin: 0 !important;
            padding: 0 0.3rem !important;
          }

          span {
            margin: 0 !important;
            font-size: 0.9rem;
            color: var(--gray-600);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
          }

          .create-at {
            font-size: 0.8rem;
          }
        }

        h3 {
          margin: 0 !important;
          font-size: 1rem;
          color: var(--text-white);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
      }

      .author-avatar {
        padding: 0 1rem;
        width: 25%;
        display: flex;
        justify-content: center;
        margin-top: -2rem;
        z-index: 100 !important;

        .verified-icon {
          color: #08a0f7;
          font-size: 12px;
        }

        .circle-avatar {
          border: 1px solid var(--gray-600);
          height: 2.8vw;
          width: 2.8vw;
          display: flex;
          justify-content: center;
          padding: 0.1vw;
          border-radius: 100%;
        }

        .avatar-account-video {
          width: 2.6vw;
          height: 2.6vw;
          font-size: 2vw;

          img {
            width: 100%;
            height: 100%;
            opacity: 1 !important;
          }
        }
      }
    }
  }

  .skeleton-card {
    width: 100%;
    height: 18rem;
    border-radius: 20px;

    .skeleton-card {
      width: 100% !important;
      height: 18rem;
      border-radius: 20px;
    }
  }
    }
  }
`;

export const ChannelName = styled.h3`
  padding: 0;
  margin: 0;
  height: auto;
  align-items: center;
  vertical-align: middle;
  width: 30%;
`;

export const AdditionalInfo = styled.h4`
  padding: 0;
  margin: 0;
  height: auto;
  width: auto;
  align-items: center;
  vertical-align: middle;
  font-size: 0.9rem;
  justify-content: end;
  text-align: end;
`;

export const NameInfo = styled.span`
  color: var(--blue-600);
`;
