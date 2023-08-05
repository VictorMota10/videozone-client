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

  .grid-list-channels {
    width: 100%;
  }

  .channel-new-card {
    background-color: var(--blue-500);
    border: none !important;
    padding: 1px 1px 1% !important;
    margin: 0 !important;
    width: 16dvw;
    height: 32dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .ant-card-body {
      padding: 0 !important;
      margin: 0 !important;
      height: 100%;
    }
  }

  .channel-card {
    background-color: var(--blue-500);
    border: none !important;
    padding: 1px 1px 1% !important;
    margin: 0 !important;
    width: 16dvw;
    height: 32dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .image-container {
      background-color: transparent;
      border-radius: 8px 8px 0 0;
    }

    .cover-card {
      height: 20dvh;
      width: 100%;
    }

    .ant-card-meta {
      padding: 0 !important;
      margin: 0 !important;
    }

    .ant-card-body {
      padding: 2% 0 !important;
      margin: 0 !important;
      height: 12dvh;

      .content-card {
        padding: 4% 6% !important;
        height: 55%;
        width: 100%;

        .ant-card-meta-title {
          color: var(--text-white) !important;
          font-size: 0.9rem;
        }
      }
    }
  }
`;

export const ContainerChannels = styled.section`
  display: flex;
  padding: 3dvh 0;
  width: 100%;
`;

export const ContainerManageChannel = styled.section`
  display: flex;
  height: 40%;
  padding: 0 6%;

  .button-manage-channel {
    background-color: var(--orange-800);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
  }

  .button-manage-channel:hover {
    border: 1px solid var(--text-white);
  }
`;

export const ContainerNewChannel = styled.section`
  display: flex;
  height: 100%;
  padding: 0;
  align-items: center;
  justify-content: center;

  .container-new-channel-action {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;

    .plus-create-channel {
      color: var(--text-gray);
      font-size: 2.4rem;
    }

    .title-create-channel {
      padding: 1rem 0 0 !important;
      margin: 0 !important;
      color: var(--text-gray);
      font-size: 1rem;
    }
  }
`;
