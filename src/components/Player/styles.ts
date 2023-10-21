import { Row } from "antd";
import styled from "styled-components";

export const Container = styled(Row)`
  .fullscreen {
    padding: 0;
    margin: 0;
    top: 0 !important;
    left: 0 !important;
    position: fixed !important;
    z-index: 998;
    min-height: 100% !important;
    min-width: 100%;
  }

  .video-player-container {
    padding: 0;

    &:not(.fullscreen) {
      .video-player {
        video {
          border-radius: 12px;
          background-color: black;
          border: 1px solid var(--blue-500);

          :hover {
            cursor: pointer;
            opacity: 0.8;
          }
        }
      }
    }

    &:has(.fullscreen) {
      .video-player {
        video {
          border-radius: 0 !important;
          background-color: black;
          border: 1px solid black;

          :hover {
            cursor: pointer;
            opacity: 1;
          }
        }
      }

      #control-player {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 999;
        border-radius: 0 !important;
      }
    }
  }

  .started-hide-controls {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.2s linear;
  }

  &:hover {
    padding-bottom: 0 !important;
    .started-hide-controls {
      visibility: visible;
      opacity: 1;
      bottom: 0;
      width: 100%;
      position: absolute;
    }
  }
`;

export const Controls = styled(Row)`
  background: transparent;
  border-radius: 0 0 12px 12px;
  bottom: 0;
  width: 100%;
  position: absolute;

  .slider-progress-container {
    margin: 0;
    padding: 0 24px;

    .progressbar-video {
      margin: 0;
      padding: 0;
      transition: 350ms;
      height: 5px !important;

      &:hover {
        .ant-slider-handle {
          display: flex !important;
          &::after {
            width: 8px;
            height: 8px;
            box-shadow: 0 0 0 1px var(--orange-800);
          }
        }
      }
    }

    .ant-slider-rail {
      background-color: rgba(255, 255, 255, 0.5);
      height: 5px;
    }

    .ant-slider-handle {
      top: -2px;
      display: none !important;
      width: 6px !important;
      height: 6px !important;
    }

    .ant-slider-track {
      background-color: var(--orange-800);
      height: 5px;
    }
  }
`;

export const ButtonsControl = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  .control-buttons-container {
    padding: 4px;
    display: flex;
  }

  .control-btn__sync {
    background-color: transparent;
    border: none !important;
    padding: 8px;
    font-size: 12px;
    transition: 450ms;
    width: auto;

    &:hover,
    &:focus {
      background-color: transparent;
      border: none !important;
      transform: scale(1.05);
      outline: none !important;
    }
  }

  .control-btn__play,
  .control-btn__fullscreen {
    background-color: transparent;
    border: none !important;
    padding: 8px;
    font-size: 16px;
    transition: 450ms;

    &:hover,
    &:focus {
      background-color: transparent;
      border: none !important;
      transform: scale(1.15);
      outline: none !important;
    }
  }

  .final-container {
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 4px;
  }
`;
