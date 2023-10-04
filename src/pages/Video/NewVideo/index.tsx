import React, { useEffect, useState } from "react";
import * as S from "./styles";

import { Col, Row } from "antd";

import { FormCreateVideo } from "./components/FormCreateVideo";
import { useParams } from "react-router-dom";

export const NewVideo: React.FC<{}> = () => {
  const { channel_id } = useParams();
  const [channelId, setChannelId] = useState<string>("");

  const verifyChannelOwner = (channelId: string) => {
    // funcao que valida propriedade do canal
    setChannelId(channelId);
  };

  useEffect(() => {
    verifyChannelOwner(channel_id || "");
  }, [channel_id]);

  return (
    <S.ContainerContent>
      <Row style={{ width: "100%", marginBottom: "48px" }}>
        <Col span={24} style={{ display: "flex", flexDirection: "column" }}>
          <h3>New video upload</h3>
        </Col>
      </Row>
      <Row style={{ width: "100%", marginBottom: "48px" }}>
        <Col span={24} style={{ display: "flex", flexDirection: "column" }}>
          <FormCreateVideo channelId={channelId} />
        </Col>
      </Row>
    </S.ContainerContent>
  );
};
