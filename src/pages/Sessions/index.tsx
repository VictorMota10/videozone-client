import * as S from "./styles";
import { Avatar, Button, List } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Sessions = () => {
  const navigate = useNavigate();
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

  return (
    <S.ContainerContent>
      <S.TopContainer>
        <h3>Sessões</h3>
      </S.TopContainer>
      <h3 className="invite-label">Convites</h3>
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
                Entrar
              </Button>
              <Button
                className="decline-session"
                onClick={() => console.log("criar sessao")}
              >
                Recusar
              </Button>
            </div>
          </List.Item>
        )}
      />
    </S.ContainerContent>
  );
};
