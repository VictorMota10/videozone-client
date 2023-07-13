import styled from "styled-components";

export const ContainerContent = styled.div`
  height: 100%;
  padding-right: 1rem;

  h3 {
    font-size: 1.4rem;
    padding: 0 !important;
    margin: 0 !important;
    color: var(--text-gray);
    font-weight: 500;
  }

  .list-item-sessions {
    .ant-list-item-meta-content {
      .ant-list-item-meta-title {
        * {
          color: var(--text-white) !important;
        }
      }
      .ant-list-item-meta-description {
        color: var(--text-gray) !important;
      }
    }
  }

  .list-container-actions {
    width: 14dvw;
    display: flex;
    justify-content: flex-end;
    .join-session {
      border: none !important;
      background-color: var(--green-900);
      color: var(--text-white) !important;
      margin-right: 1dvw;
    }
    .decline-session {
      border: none !important;
      background-color: var(--red-800);
      color: var(--text-white) !important;
    }
    button:hover{
      opacity: 0.8;
    }
  }

  button:focus{
    border: none !important;
    outline: none !important;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 1rem;

  .create-session {
    background: var(--orange-800);
    width: 16%;
    border: none !important;
    color: var(--text-white);

    &:hover {
      color: var(--text-white);
      opacity: 0.9 !important;
    }
  }
`;
