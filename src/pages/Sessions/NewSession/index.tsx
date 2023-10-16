import { FormProvider, useForm } from "react-hook-form";
import * as S from "./styles";
import { Button, Col, Row, Space } from "antd";
import { Input } from "../../../components/Input";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../../service/config-http";
import { VideoResponseProps } from "../../../interface/Video";
import { useUser } from "../../../context/userContext";
import { useNotification } from "../../../context/notification";
import { ModalFinishSessionActive } from "./components/ModalFinishSessionActive";
import { pathRoutes } from "../../../service/path-routes";

export const NewSession = () => {
  const navigate = useNavigate();
  const { userCredentials } = useUser();
  const { openNotification } = useNotification();
  const { video_uuid } = useParams();
  const methods = useForm();

  const { handleSubmit } = methods;

  const [videoData, setVideoData] = useState<VideoResponseProps>();
  const [openModalFinish, setOpenModalFinish] = useState<boolean>(false);
  const [sessionAlreadyExistsUUID, setSessionAlreadyExistsUUID] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  const onSubmit = async (data: any) => {
    setLoading(true);
    const payload = {
      ...data,
      video_uuid: video_uuid,
    };

    await apiRequest
      .post("/session/create", payload, {
        headers: {
          Authorization: `Bearer ${userCredentials?.accessToken}`,
        },
      })
      .then((response: any) => {
        setLoading(false);
        navigate(pathRoutes.SESSION.player(response?.data?.session_uuid));
      })
      .catch((error) => {
        openNotification(
          "error",
          "Ops...",
          error?.response?.data?.message ?? "Houve um erro ao criar a sessão"
        );
        if (error?.response?.status === 406) {
          const { session_uuid } = error?.response?.data?.session_data;
          setOpenModalFinish(true);
          setSessionAlreadyExistsUUID(session_uuid);
        }
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (video_uuid) {
      getVideoData();
    }
  }, [video_uuid]);

  return (
    <>
      <ModalFinishSessionActive
        open={openModalFinish}
        onCancel={() => setOpenModalFinish(false)}
        session_uuid={sessionAlreadyExistsUUID}
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      required={false}
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
              </Space>
            </S.LeftArea>
            <S.RightArea span={13}>
              <Row style={{ width: "100%" }} gutter={[0, 24]}>
                <Col className="choose-video" span={24}>
                  <span>Video selecionado:</span>
                  <img src={videoData?.thumbnail_url} alt="Imagem capa video" />
                  <h4>Título: {videoData?.title}</h4>
                </Col>
              </Row>

              <Row style={{ width: "100%" }} gutter={[0, 24]}>
                <Col
                  span={24}
                  style={{
                    marginTop: "32px",
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    loading={loading}
                    className="invite-session"
                    htmlType="submit"
                  >
                    Criar sessão
                  </Button>
                </Col>
              </Row>
            </S.RightArea>
          </S.Container>
        </form>
      </FormProvider>
    </>
  );
};
