import { Col, Row } from "antd";
import styled from "styled-components";

export const Container = styled(Row)`
  display: flex;
  justify-content: space-between;
  input {
    border: 1px solid var(--blue-500);
    height: 38px;
  }
`;

export const Title = styled(Col)`
  display: flex;

  h2 {
    margin: 0 0 24px 0;
    padding: 0;
    font-size: 18px;
  }
`;

export const LeftArea = styled(Col)`
  .choose-video {
    margin: 8px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;

    span {
      font-size: 16px;
      font-weight: 500 !important;
      color: var(--text-white);
    }

    img {
      margin: 0;
      padding: 8px 0;
      width: 300px;
      height: 200px;
      border-radius: 24px;
    }
    h4 {
      margin: 0;
      padding: 0 0 8px 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-gray);
    }
  }
`;

export const RightArea = styled(Col)``;
