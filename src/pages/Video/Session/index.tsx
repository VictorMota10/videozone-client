import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as S from "./styles";
import { Avatar, Col, List, Row } from "antd";
import ReactPlayer from "react-player";

export const VideoPlayerSession = () => {
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState<any>(null);
  const { video_uuid, video_url } = useParams();

  function pausePlaying() {
    setPaused(true);
    if (timer) clearInterval(timer);
  }

  function getTimer() {
    const DivVideoPlayer: any = document.getElementById(
      "video-player"
    ) as HTMLDivElement;
    let timeVideoSession = DivVideoPlayer.firstChild.currentTime;
    console.log(timeVideoSession);
  }

  const data = [
    {
      title: "Ant Design Title 1",
    },
  ];

  return (
    <S.Container>
      <Col
        className="video-player-container"
        xs={24}
        sm={24}
        md={18}
        lg={18}
        xl={18}
      >
        <Col span={16}>
          <h3>Titulo da Sessão aqui...</h3>
        </Col>
        <ReactPlayer
          onPlay={() => setPaused(false)}
          onPause={() => pausePlaying()}
          onStart={() => {
            setStarted(true);
          }}
          className="video-player"
          id="video-player"
          width="96%"
          height="72vh"
          controls={true}
          url={
            "https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/videos%2FD'ROSE.mp4&uuid=ef5a7059-029d-4d06-4e4d-ee27e90a9319?alt=media"
          }
          config={{ file: { attributes: { controlsList: "nodownload" } } }}
        />
        <Row className="info-session">
          <Col span={18}>
            <h4>Watching: nome do video aqui...</h4>
          </Col>
          <Col span={6}>
            <h4>Nome Autor da sessão</h4>
          </Col>
        </Row>
      </Col>
      <Col
        className="users-session-container"
        xs={24}
        sm={24}
        md={6}
        lg={6}
        xl={6}
      >
        <h4 className="title">Session Users</h4>
        <List
          className="list-users"
          itemLayout="vertical"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={item.title}
              />
            </List.Item>
          )}
        />
      </Col>
    </S.Container>
  );
};
