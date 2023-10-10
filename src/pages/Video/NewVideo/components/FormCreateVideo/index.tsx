import React, { useEffect, useState } from "react";
import { Button, Col, Row, Space, Upload, UploadProps } from "antd";
import { Controller, FormProvider, useForm } from "react-hook-form";

import uuid from "react-uuid";
import ReactPlayer from "react-player";

import * as S from "./styles";

import { UploadVideoPayload } from "../../../../../interface/Video";
import { Input } from "../../../../../components/Input";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { apiRequest } from "../../../../../service/config-http";
import { AxiosError, AxiosResponse } from "axios";
import fs from "fs";

export const FormCreateVideo: React.FC<{ channelId: string }> = ({
  channelId,
}) => {
  const [thumbnailFile, setThumbnailFile] = useState<any>();
  const [thumbPreviewUrl, setThumbPreviewUrl] = useState<string>();
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>();
  const [videoUpload, setVideoUpload] = useState<any>(null);
  const [onLoadingUpload, setOnLoadingUpload] = useState<Boolean>(false);
  const [fileUrl, setFileUrl] = useState<any>(null);
  const methods = useForm<UploadVideoPayload>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const propsVideoUpload: UploadProps = {
    accept: "video/mp4",
    multiple: false,
    maxCount: 1,
    onRemove: () => {
      setVideoUpload(undefined);
    },
    beforeUpload: (file) => {
      setVideoUpload(file);
      setVideoPreviewUrl(window.URL.createObjectURL(file));
      return false;
    },
  };

  const propsThumbUpload: UploadProps = {
    accept: "image/png, image/jpg, image/jpeg",
    multiple: false,
    maxCount: 1,
    onRemove: () => {
      setThumbnailFile(undefined);
    },
    beforeUpload: (file) => {
      setThumbnailFile(file);
      setThumbPreviewUrl(window.URL.createObjectURL(file));
      return false;
    },
  };

  const onSubmit = async (data: UploadVideoPayload) => {
    if (!data) return;

    console.log(data);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    let formData = new FormData();

    const filesArray = [data.videoFile?.file, data.thumbFile?.file];

    console.log(filesArray);

    filesArray.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("title", data.title);
    formData.append("description", data.description ?? new String());
    formData.append("channel_id", channelId);
    formData.append("uuid", uuid());

    await apiRequest
      .post("/video/upload", formData, config)
      .then((response: AxiosResponse) => {
        console.log(response);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });

    // await apiRequest
    //   .post("/channel/create", payload, {
    //     headers: {
    //       Authorization: `Bearer ${userCredentials?.accessToken}`,
    //     },
    //   })
    //   .then((response) => {
    //     setSuccessOnCreate(true);
    //     setLoadingCreateChannel(false);
    //     setUrlImageUploaded(fileUploadUrl);
    //     setChannelCreated({
    //       id: response.data?.id,
    //       name: payload.name,
    //     });
    //     openNotification("success", "Success", "Channel created!");
    //   })
    //   .catch((error) => {
    //     openNotification("error", "Ops...", "Error on try create channel");
    //     setLoadingCreateChannel(false);
    //   });
  };

  return (
    <S.FormContainer>
      <FormProvider {...methods}>
        <form className="form_new_video" onSubmit={handleSubmit(onSubmit)}>
          <section className="new-video_left-container">
            <Space direction="vertical" size={32} style={{ display: "flex" }}>
              <Row style={{ width: "100%" }}>
                <Col span={24}>
                  <Input
                    name="title"
                    label="Session title"
                    required
                    type="text"
                    maxLength={100}
                    placeholder="Type session title..."
                    autoComplete="off"
                  />
                </Col>
                <Col span={2}></Col>
              </Row>
              <Row style={{ width: "100%" }}>
                <Col span={24}>
                  <div className="text-area_container">
                    <label>Description</label>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => (
                        <TextArea
                          {...field}
                          placeholder="Type video description..."
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
                  span={16}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textOverflow: "ellipsis",
                    overflow: "clip",
                  }}
                >
                  <label>Video</label>
                  <Controller
                    name="videoFile"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Upload {...propsVideoUpload} {...field}>
                        <Button
                          className="btn-upload-video"
                          icon={<UploadOutlined />}
                        >
                          Select File
                        </Button>
                      </Upload>
                    )}
                  />
                </Col>
              </Row>
              <Row style={{ width: "100%" }}>
                <Col
                  span={16}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    overflow: "clip",
                    textOverflow: "ellipsis",
                  }}
                >
                  <label>Thumbnail</label>
                  <Controller
                    name="thumbFile"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Upload {...propsThumbUpload} {...field}>
                        <Button
                          className="btn-upload-video"
                          icon={<UploadOutlined />}
                        >
                          Select File
                        </Button>
                      </Upload>
                    )}
                  />
                </Col>
              </Row>
              {thumbPreviewUrl && (
                <Row style={{ width: "100%" }}>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      paddingBottom: "2rem",
                    }}
                  >
                    <img
                      className="thumb_preview"
                      src={thumbPreviewUrl}
                      alt="thumbnail"
                    />
                  </Col>
                </Row>
              )}
            </Space>
          </section>
          <section className="new-video_right-container">
            <Row style={{ width: "100%" }}>
              <Col span={24}>
                {videoPreviewUrl ? (
                  <ReactPlayer
                    className="new-video-preview"
                    width="100%"
                    height="100%"
                    controls={true}
                    url={videoPreviewUrl}
                    config={{
                      file: { attributes: { controlsList: "nodownload" } },
                    }}
                  />
                ) : (
                  <S.VideoPreviewContainer>
                    Waiting upload video file to preview...
                  </S.VideoPreviewContainer>
                )}
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col
                span={24}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  padding: "2rem 0",
                }}
              >
                <Button
                  disabled={!videoUpload || !thumbnailFile}
                  className="upload-video"
                  htmlType="submit"
                >
                  Upload Video
                </Button>
              </Col>
            </Row>
          </section>
        </form>
      </FormProvider>
    </S.FormContainer>
  );
};
