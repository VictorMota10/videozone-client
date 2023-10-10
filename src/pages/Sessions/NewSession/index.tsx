import { FormProvider, useForm } from "react-hook-form";
import * as S from "./styles";
import { Col, Row, Space } from "antd";
import { Input } from "../../../components/Input";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../../service/config-http";
import { VideoResponseProps } from "../../../interface/Video";
import { Switch } from "../../../components/Switch";

export const NewSession = () => {
  const { video_uuid } = useParams();
  const methods = useForm();

  const [videoData, setVideoData] = useState<VideoResponseProps>();

  const getVideoData = async () => {
    await apiRequest
      .get(`video/${video_uuid}`)
      .then((response) => {
        const { data } = response;
        setVideoData(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (video_uuid) {
      getVideoData();
    }
  }, [video_uuid]);

  return (
    <FormProvider {...methods}>
      <form>
        <S.Container gutter={[8, 0]}>
          <S.Title span={24}>
            <h2>Nova Sessão</h2>
          </S.Title>
          <S.LeftArea span={10}>
            <Space direction="vertical" size={20} style={{ display: "flex" }}>
              <Row style={{ width: "100%" }}>
                <Col span={24}>
                  <Input
                    name="title"
                    label="Titulo da sessão"
                    required
                    type="text"
                    maxLength={100}
                    placeholder="Digite o titulo da sessão..."
                    autoComplete="off"
                  />
                </Col>
                <Col span={2}></Col>
              </Row>
              <Row style={{ width: "100%" }}>
                <Col span={24}>
                  <Input
                    name="description"
                    label="Descrição"
                    type="text"
                    maxLength={100}
                    placeholder="Digite a descrição..."
                    autoComplete="off"
                  />
                </Col>
                <Col span={2}></Col>
              </Row>

              <Row style={{ width: "100%" }} gutter={[0, 24]}>
                <Col className="choose-video" span={24}>
                  <span>Video selecionado:</span>
                  <img src={videoData?.thumbnail_url} alt="Imagem capa video" />
                  <h4>{videoData?.title}</h4>
                </Col>
                <Col
                  style={{ display: "flex", alignItems: "center" }}
                  span={24}
                >
                  <span style={{ marginRight: "8px" }}>
                    Visibilidade da sessão:
                  </span>
                  <Switch
                    name="visibilyPublic"
                    checkedChildren="Pública"
                    unCheckedChildren="Privada"
                    defaultChecked
                  />
                </Col>
              </Row>
            </Space>
          </S.LeftArea>
          <S.RightArea span={13}>
            <Space direction="vertical" size={20} style={{ display: "flex" }}>
              <Row style={{ width: "100%" }}>
                <Col span={24}>
                  <span>Convidar amigos:</span>
                </Col>
              </Row>
            </Space>
          </S.RightArea>
        </S.Container>
      </form>
    </FormProvider>
  );
};
