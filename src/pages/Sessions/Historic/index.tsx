import * as S from "./styles";
import { Avatar, Button, List } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Sessions = () => {
  const navigate = useNavigate();
  const data = [
    {
      title: "Titulo da sessão",
    },
    {
      title: "Titulo da sessão",
    },
    {
      title: "Titulo da sessão",
    },
    {
      title: "Titulo da sessão",
    },
  ];

  return (
    <S.ContainerContent>
      <h3 className="invite-label">Histório de sessões criadas</h3>
      <List
        style={{ marginTop: "1rem" }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              className="list-item-sessions"
              title={<span>{item.title}</span>}
              description="Ultimo video assistido: xxxxx- xxxxx"
            />
            <div className="list-container-actions">
              <Button
                className="join-session"
                onClick={() => console.log("criar sessao")}
              >
                Detalhes
              </Button>
            </div>
          </List.Item>
        )}
      />
    </S.ContainerContent>
  );
};
