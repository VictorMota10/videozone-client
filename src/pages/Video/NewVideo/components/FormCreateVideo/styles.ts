import styled from "styled-components";

export const FormContainer = styled.div`
  .ant-input {
    height: 2.6rem;
    border: 1px solid var(--blue-500);
  }

  label {
    color: var(--gray-600);
  }

  input[type="file"] {
    background-color: red;
  }

  .btn-upload-video {
    background-color: transparent;
    color: var(--text-white);
  }

  .ant-upload-wrapper {
    display: flex;

    .ant-upload-list {
      display: flex;
      padding: 0 1rem;

      .ant-upload-list-item {
        width: 100%;
      }

      .ant-upload-list-item,
      .ant-upload-list-item svg {
        color: var(--gray-600) !important;
      }

      .ant-upload-list-item-actions {
        display: none !important;
      }
    }
  }

  .text-area_container {
    textarea {
      border: 1px solid var(--blue-500);
      background-color: var(--blue-400);
      color: var(--text-gray);
      margin-top: 4px;
      height: 6rem;

      &::placeholder {
        color: var(--text-gray);
      }
    }
  }

  .new-video-preview {
    width: 100% !important;
    height: 360px !important;
    max-height: 360px !important;
  }

  .form_new_video {
    display: flex;
    justify-content: space-between;
    .new-video_left-container {
      width: 49%;

      .thumb_preview {
        width: 60%;
        max-height: 260px;
        border-radius: 16px;
      }
    }

    .new-video_right-container {
      width: 49%;
      min-height: 74dvh;
      padding-right: 1rem;

      .upload-video {
        background-color: var(--orange-800);
        color: var(--text-white);
        border: none;
        &:disabled {
          background-color: var(--orange-900);
          opacity: 0.6;
        }
      }

      .new-video-preview {
        video {
          border-radius: 18px;
        }
      }
    }
  }
`;

export const VideoPreviewContainer = styled.div`
  width: 100%;
  height: 340px;
  border: 1px solid var(--blue-500);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`
