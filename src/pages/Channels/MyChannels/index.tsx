import react from "react";
import * as S from "./styles";
import { Card, Col, Row } from "antd";

export const MyChannels = () => {
  return (
    <S.ContainerContent>
      <h3>My channels</h3>
      <Row className='grid-list-channels' gutter={16}>
        <Col className="gutter-row" span={6}>
          <Card
            className="channel-card"
            hoverable
            cover={
              <img
                className="cover-card"
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
          </Card>
        </Col>
      </Row>
    </S.ContainerContent>
  );
};
