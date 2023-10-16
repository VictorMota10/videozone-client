import { Button, Col, Modal, Row } from "antd";

import "./styles.scss";
import { apiRequest } from "../../../../../service/config-http";
import { useState } from "react";
import { useUser } from "../../../../../context/userContext";
import { useNotification } from "../../../../../context/notification";

interface ModalFinishSessionProps {
  open: boolean;
  onCancel: () => void;
  session_uuid: string;
}

export const ModalFinishSessionActive = ({
  open,
  onCancel,
  session_uuid,
}: ModalFinishSessionProps) => {
  const { openNotification } = useNotification();
  const { userCredentials } = useUser();
  const [loading, setLoading] = useState<boolean>();

  const handleFinishSession = async () => {
    setLoading(true);

    await apiRequest
      .post(
        "/session/inactivate",
        { session_uuid: session_uuid },
        {
          headers: {
            Authorization: `Bearer ${userCredentials?.accessToken}`,
          },
        }
      )
      .then(() => {
        onCancel();
        setLoading(false);
        openNotification(
          "success",
          "Sucesso!",
          "Sessão inativada com sucesso!"
        );
      })
      .catch((error) => {
        setLoading(false);
        openNotification(
          "error",
          "Ops...",
          error?.response?.data?.message ?? "Houve um erro ao inativar a sessão"
        );
        return;
      });
  };

  return (
    <Modal
      className="modal__session-active"
      open={open}
      onCancel={() => {
        onCancel();
      }}
      footer={null}
    >
      <h3>Sessão ativa encontrada</h3>
      Para criar uma nova sessão você deve encerrar a anterior ativa...
      <Row>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "32px 0 0",
          }}
        >
          <Button
            onClick={() => handleFinishSession()}
            loading={loading}
            className="finish-session"
            htmlType="button"
          >
            Encerrar anterior
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
