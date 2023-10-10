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
    height: 16%;
    width: 100%;

    .video-title {
      font-weight: 400;
      font-size: 16px;
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
      padding: 4px 0.4rem;
      justify-content: flex-end;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;

      .ant-avatar{
        border: 1px solid var(--blue-600)
      }
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
      height: 100%;

      span.author-name {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        font-weight: 500;
        width: auto;
        white-space: nowrap;
        text-align: end;
      }

      .create-at {
        margin: 0;
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
  height: 48vh;
  margin: 2% 0 0;
  flex-direction: column;
  justify-content: space-between;
`;

export const SecundaryVideoContainer = styled.div`
  display: flex;
  width: 28%;

  flex-direction: column;
  justify-content: space-between;
  height: 48vh;
  margin: 2% 0 0;
`;

export const ThirdVideoContainer = styled.div`
  display: flex;
  width: 28%;

  flex-direction: column;
  justify-content: space-between;
  height: 48vh;
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
`;
