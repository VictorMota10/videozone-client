import styled from "styled-components";

export const DiscoverContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-x: hidden;
  padding-right: 2%;

  h1 {
    padding: 0 !important;
    margin: 0 !important;
    font-size: 2rem !important;
    font-weight: 500;
  }
`;
export const VideosDiscoverContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;

  div:hover {
    opacity: 0.9;
    cursor: pointer;
  }

  img.thumbnail-img {
    background: var(--gray-800);
    border-radius: 20px;
    width: 100%;
    height: 84%;

    &:hover {
      cursor: pointer;
    }
  }

  div.author-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    width: 100%;

    .video-title {
      font-weight: 500;
      font-size: 1.1rem;
      margin: 0 !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      max-width: 65%;
    }

    .author-info {
      display: flex;
      width: auto;
      max-width: 45%;
      padding: 0 0.4rem;
      justify-content: flex-end;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .verified-icon {
      color: #08a0f7;
      font-size: 12px;
    }

    div.video-infos {
      display: flex;
      flex-direction: column;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 0.5rem;

      span.author-name {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        font-weight: 500;
        width: auto;
        white-space: nowrap;
        text-align: end;
      }

      .create-at {
        margin: 0 0 0 1rem;
        font-size: 12px;
        font-weight: 300;
        color: var(--text-gray);
        text-align: end;
      }
    }
  }

  .skeleton-loading {
    border-radius: 20px !important;
    width: 100% !important;
    height: 96% !important;

    opacity: 1;

    animation: mymove 5s infinite;
    background: var(--gray-800);

    @keyframes mymove {
      from {
        background-color: var(--gray-800);
      }
      to {
        background-color: var(--blue-900);
      }
    }
  }
`;

export const MainVideoContainer = styled.div`
  display: flex;
  width: 40%;
  height: 42vh;
  margin: 2% 0 0;
  flex-direction: column;
  justify-content: space-between;
`;

export const SecundaryVideoContainer = styled.div`
  display: flex;
  width: 28%;

  flex-direction: column;
  justify-content: space-between;
  height: 42vh;
  margin: 2% 0 0;
`;

export const ThirdVideoContainer = styled.div`
  display: flex;
  width: 28%;

  flex-direction: column;
  justify-content: space-between;
  height: 42vh;
  margin: 2% 0 0;
`;

export const AnotherVideosContinainer = styled.div`
  display: flex;
  width: 100%;

  flex-direction: column;
  justify-content: space-between;
  height: auto;
  margin: 2% 0 0;
  padding: 2% 0 4%;

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
`;
