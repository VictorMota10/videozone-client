import react, { useEffect, useState } from "react";
import "./styles.scss";

import { Col, Modal, Row, Space, message, Upload, Button, Avatar } from "antd";
import {
  CreateChannelPayload,
  NewChannelModalProps,
} from "../../../interface/NewChannelModalProps";
import { Input } from "../../Input";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { imageUpload } from "../../../hooks/uploadImage";
import TextArea from "antd/es/input/TextArea";
import { apiRequest } from "../../../service/config-http";
import { useUser } from "../../../context/userContext";

export const NewChannelModal = ({ open, onCancel }: NewChannelModalProps) => {
  const { userCredentials } = useUser();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileInfo, setFileInfo] = useState<UploadChangeParam<UploadFile>>();
  const [loadingCreateChannel, setLoadingCreateChannel] =
    useState<boolean>(false);
  const [successOnCreate, setSuccessOnCreate] = useState<boolean>(false);
  const [urlImageUploaded, setUrlImageUploaded] = useState<string>();

  const methods = useForm<CreateChannelPayload>();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    setFileInfo(info);
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onSubmit = async (data: CreateChannelPayload) => {
    setLoadingCreateChannel(true);
    let fileUploadUrl: string = "";
    if (fileInfo) {
      fileUploadUrl = await imageUpload(fileInfo.file?.originFileObj);
    }

    const payload = {
      imageUrl: fileUploadUrl,
      name: data?.name,
      description: data?.description,
    };

    await apiRequest
      .post("/create-channel", payload, {
        headers: {
          Authorization: `Bearer 40920423409240kkdosfoksd313`,
        },
      })
      .then((response) => {
        setSuccessOnCreate(true);
        setLoadingCreateChannel(false);
        setUrlImageUploaded(fileUploadUrl);
      })
      .catch((error) => {
        setLoadingCreateChannel(false);
      });
  };

  const clearDataModal = () => {
    reset();
    setFileInfo(undefined);
    setImageUrl("");
    setLoadingCreateChannel(false);
    setSuccessOnCreate(false);
    setUrlImageUploaded("");
  };

  useEffect(() => {
    clearDataModal();
  }, [reset]);

  return (
    <Modal
      className={
        !successOnCreate ? "new_channel_modal" : "created_channel_modal"
      }
      open={open}
      onCancel={() => {
        clearDataModal();
        onCancel();
      }}
      footer={null}
    >
      {!successOnCreate ? (
        <>
          <h3 className="new_channel_modal--title">New Channel</h3>
          <FormProvider {...methods}>
            <form
              className="form_new_channel"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Space
                className="space__login"
                direction="vertical"
                size={30}
                style={{ display: "flex" }}
              >
                <Row style={{ width: "100%" }}>
                  <Col span={8}>
                    <label>Channel Image</label>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                      customRequest={() => {}}
                    >
                      {imageUrl ? (
                        <img src={imageUrl} alt="avatar" />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Col>
                  <Col
                    span={16}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Input
                      name="name"
                      label="Channel name"
                      required
                      type="text"
                      maxLength={100}
                      placeholder="Type channel name..."
                      autoComplete="off"
                    />
                    <div className="text-area_container">
                      <label>Description</label>
                      <Controller
                        name="description"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            placeholder="Type channel description..."
                            maxLength={250}
                            rows={4}
                          />
                        )}
                      />
                    </div>
                  </Col>
                </Row>

                <Row style={{ width: "100%" }}>
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      htmlType="submit"
                      className="btn_new_channel"
                      type="primary"
                      loading={loadingCreateChannel}
                    >
                      Create
                    </Button>
                  </Col>
                </Row>
              </Space>
            </form>
          </FormProvider>
        </>
      ) : (
        <>
          <Row style={{ width: "100%" }}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Avatar
                size={64}
                icon={<img src={urlImageUploaded} alt="channel_logo" />}
              />
            </Col>
          </Row>
        </>
      )}
    </Modal>
  );
};
