import styled from "styled-components";

export const CardVideo = styled.div`
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
        color: var(--gray-600);

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
          display: flex;
          align-items: center;
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
