import react, { useEffect } from "react";
import * as S from "./styles";
import { Avatar, Button, List } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

export const Sessions = () => {
  const data = [
    {
      title: "Username 1",
    },
    {
      title: "Username 2",
    },
    {
      title: "Username 3",
    },
    {
      title: "Username 4",
    },
  ];

  useEffect(() => {

  }, [])
  return (
    <S.ContainerContent>
      <S.TopContainer>
        <h3>Sessions</h3>
        <Button
          className="create-session"
          onClick={() => console.log("criar sessao")}
          icon={<PlayCircleOutlined />}
        >
          New Session
        </Button>
      </S.TopContainer>
      <h3 className='invite-label'>Invites</h3>
      <List
        style={{ marginTop: "1rem" }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              className="list-item-sessions"
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={<span>{item.title}</span>}
              description="Watching: video name here"
            />
            <div className="list-container-actions">
              <Button
                className="join-session"
                onClick={() => console.log("criar sessao")}
              >
                Join
              </Button>
              <Button
                className="decline-session"
                onClick={() => console.log("criar sessao")}
              >
                Decline
              </Button>
            </div>
          </List.Item>
        )}
      />
    </S.ContainerContent>
  );
};
