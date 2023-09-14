import react, { useEffect, useState } from "react";
import * as S from "./styles";
import { Card, Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { NewChannelModal } from "../../../components/Modal/NewChannelModal";
import { useUser } from "../../../context/userContext";
import { apiRequest } from "../../../service/config-http";
import { ChannelProps } from "../../../interface/Channel";
import { AxiosResponse } from "axios";
import ImageNotFound from '../../../assets/image-not-found.png'
import { pathRoutes } from "../../../service/path-routes";

export const MyChannels = () => {
  const navigate = useNavigate();
  const { userCredentials } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channels, setChannels] = useState<ChannelProps[]>([]);

  const getChannelList = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userCredentials?.accessToken}`,
      },
    };
    await apiRequest
      .get(`/channel/list?uid=${userCredentials?.uid}`, config)
      .then((response: AxiosResponse) => {
        setChannels(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (userCredentials) {
      getChannelList();
    }
  }, [userCredentials]);

  return (
    <S.ContainerContent>
      <h3>My channels</h3>
      <S.ContainerChannels>
        <Row className="grid-list-channels" gutter={[0, 24]} justify="start">
          {channels?.length > 0 &&
            channels?.map((channel: ChannelProps, key: any) => {
              return (
                <Col key={key} className="gutter-row" span={6}>
                  <Card
                    className="channel-card"
                    cover={
                      <div className="image-container">
                        <img
                          className="cover-card"
                          alt="example"
                          src={channel.logo_url || ImageNotFound}
                        />
                      </div>
                    }
                  >
                    <Card.Meta className="content-card" title={channel.name} />
                    <S.ContainerManageChannel>
                      <button
                        className="button-manage-channel"
                        onClick={() =>
                          navigate(pathRoutes.MANAGE_CHANNEL(channel.id))
                        }
                      >
                        Manage
                      </button>
                    </S.ContainerManageChannel>
                  </Card>
                </Col>
              );
            })}

          <Col className="gutter-row" span={6}>
            <Card
              className="channel-new-card"
              hoverable
              onClick={() => setIsModalOpen(true)}
            >
              <S.ContainerNewChannel>
                <div className="container-new-channel-action">
                  <FontAwesomeIcon
                    className="plus-create-channel"
                    icon={faPlus}
                  />
                  <h4 className="title-create-channel">New Channel</h4>
                </div>
              </S.ContainerNewChannel>
            </Card>
          </Col>
        </Row>
      </S.ContainerChannels>
      <NewChannelModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        handleRefreshChannels={() => getChannelList()}
      />
    </S.ContainerContent>
  );
};
