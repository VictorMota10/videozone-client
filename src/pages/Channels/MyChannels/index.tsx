import react, { useState } from "react";
import * as S from "./styles";
import { Card, Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { NewChannelModal } from "../../../components/Modal/NewChannelModal";

export const MyChannels = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <S.ContainerContent>
      <h3>My channels</h3>
      <S.ContainerChannels>
        <Row className="grid-list-channels" gutter={16}>
          <Col className="gutter-row" span={6}>
            <Card
              className="channel-card"
              cover={
                <div className="image-container">
                  <img
                    className="cover-card"
                    alt="example"
                    src="https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2F6qW2XkuI_400x400.png?alt=media&token=81f205c4-7fb4-401e-804e-e35258505f22"
                  />
                </div>
              }
            >
              <Card.Meta className="content-card" title="Name of channel" />
              <S.ContainerManageChannel>
                <button
                  className="button-manage-channel"
                  onClick={() => navigate("/manage-channel/id")}
                >
                  Manage
                </button>
              </S.ContainerManageChannel>
            </Card>
          </Col>
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
      <NewChannelModal open={isModalOpen} onCancel={() => setIsModalOpen(false)}/>
    </S.ContainerContent>
  );
};
