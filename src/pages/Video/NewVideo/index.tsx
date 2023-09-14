import React, { useEffect, useState } from "react";
import * as S from './styles'

import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, UploadProps } from "antd";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../infra/firebase-config";
import uuid from "react-uuid";
import { Progress } from "antd";
import ReactPlayer from "react-player";
import io from "socket.io-client";

export const NewVideo: React.FC<{}> = () => {
  const [videoUpload, setVideoUpload] = useState<any>(null);
  const [onLoadingUpload, setOnLoadingUpload] = useState<Boolean>(false);
  const [fileUrl, setFileUrl] = useState<any>(null);
  const [progress, setProgress] = useState<any>(0);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState<any>(null);

  const props: UploadProps = {
    onRemove: (file) => {
      setVideoUpload(undefined);
    },
    beforeUpload: (file) => {
      setVideoUpload(file);

      return false;
    },
  };

  const uploadVideo = () => {
    setOnLoadingUpload(true);
    if (videoUpload == null) return;
    const videoRef = ref(storage, `videos/${videoUpload.name + '(uuid=' + uuid() + ')'}`);
    const uploadTask = uploadBytesResumable(videoRef, videoUpload);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = Number(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ).toFixed();
        setProgress(uploadProgress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error: any) => {
        console.error(error);
      },
      () => {
        setOnLoadingUpload(false);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
        });
      }
    );
  };

  const handleUpdateVideoUpload = (event: any) => {
    if (event.target.files) {
      setVideoUpload(event.target.files[0]);
    }
  };

  useEffect(() => {
    console.log(fileUrl)
  }, [fileUrl])

  useEffect(() => {
    console.log(progress, onLoadingUpload)
  }, [progress, onLoadingUpload])

  return (
    <S.ContainerContent>
      <input type="file" onChange={(event) => handleUpdateVideoUpload(event)} />
      {onLoadingUpload && !fileUrl && (<Progress percent={Number(progress)} />)}
      <Button type="primary" onClick={uploadVideo} style={{ marginTop: 16 }}>
        Start Upload
      </Button>
      {fileUrl && (
        <ReactPlayer
          id="video-player"
          width="100%"
          height="100%"
          controls={true}
          url={fileUrl}
          config={{ file: { attributes: { controlsList: "nodownload" } } }}
        />
      )}
    </S.ContainerContent>
  );
};
