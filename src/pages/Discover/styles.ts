import styled from "styled-components";

export const DiscoverContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

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
`;

export const MainVideoContainer = styled.div`
  display: flex;
  width: 60%;
  height: 42vh;
  margin: 2% 0 0;
  flex-direction: column;
  justify-content: space-between;

  img {
    border-radius: 20px;
    width: 100%;
    height: 86%;
  }

  div.author-container{
    display: flex;
    justify-content: flex-start;
    align-items: center;|
    height: auto;

    .verified-icon{
      color: #08A0F7;
      font-size: 12px;
    }

    span.author-name{
      margin: 0 0 0 1rem;
      font-size: 14px;
    }
  }
`;

export const SecundaryVideoContainer = styled.div`
  display: flex;
  width: 38%;
  border: 1px solid white;
`;
