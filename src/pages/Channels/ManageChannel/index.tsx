import react, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Col, Row, Skeleton, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import * as S from "./styles";

import { useChannel } from "../../../context/channel";
import { nFormatter } from "../../../utils/numberFormater";
import { CardVideo } from "../../../components/CardVideo";
import { pathRoutes } from "../../../service/path-routes";

export const ManageChannel = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const { getChannelManagmentInfo, managmentChannelData, loading } =
    useChannel();

  useEffect(() => {
    getChannelManagmentInfo(channelId ?? "");
  }, [channelId]);

  return (
    <S.ContainerContent>
      {loading ? (
        <>
          <Skeleton.Input className="skeleton-loading" active={true} />
        </>
      ) : (
        <>
          <S.TopContainer>
            <Row style={{ width: "100%" }}>
              <Col
                span={3}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Avatar
                  size={100}
                  icon={
                    <img
                      src={managmentChannelData?.channelData?.logo_url}
                      alt="logo-url"
                    />
                  }
                />
              </Col>
              <Col span={9} style={{ display: "flex", alignItems: "center" }}>
                <S.ChannelName>
                  {managmentChannelData?.channelData?.name}
                </S.ChannelName>
              </Col>
              <Col
                span={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <S.AdditionalInfo style={{ marginRight: "8rem" }}>
                  <S.NameInfo>Seguidores:</S.NameInfo> <br />
                  {nFormatter(
                    parseInt(
                      managmentChannelData?.channelData?.followers ?? ""
                    ),
                    2
                  )}
                </S.AdditionalInfo>
                <S.AdditionalInfo style={{ marginRight: "2rem" }}>
                  <S.NameInfo>Videos:</S.NameInfo> <br />
                  {nFormatter(
                    managmentChannelData?.dashboardData?.countVideos ?? 0,
                    2
                  )}
                </S.AdditionalInfo>
              </Col>
            </Row>
          </S.TopContainer>
          <S.MiddleContainer>
            <Button
              className="button_new-video"
              onClick={() =>
                navigate(pathRoutes.NEW_VIDEO_UPLOAD(channelId || ""))
              }
              icon={<PlusOutlined />}
            >
              Novo video
            </Button>
          </S.MiddleContainer>
          <S.BottomContainer>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  label: "Videos",
                  key: "1",
                  children: (
                    <Row gutter={[16, 24]} className="grid-custom">
                      {!managmentChannelData ? (
                        <Skeleton.Input
                          className="skeleton-card"
                          active={true}
                        />
                      ) : (
                        <>
                          {managmentChannelData?.videos?.map((video) => {
                            return (
                              <Col className="gutter-row" sm={12} md={8} xl={6}>
                                <CardVideo
                                  videoData={video}
                                  channelData={
                                    managmentChannelData?.channelData
                                  }
                                />
                              </Col>
                            );
                          })}
                        </>
                      )}
                    </Row>
                  ),
                },
                {
                  label: "Painel",
                  key: "2",
                  children: "",
                  disabled: true,
                },
                {
                  label: "Detalhes do canal",
                  key: "3",
                  children: "",
                  disabled: true,
                },
              ]}
            />
          </S.BottomContainer>
        </>
      )}
    </S.ContainerContent>
  );
};
