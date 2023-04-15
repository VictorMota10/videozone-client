import { useEffect, useState } from 'react'


import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Progress } from 'antd';
import ReactPlayer from "react-player";
import uuid from 'react-uuid'
import io from 'socket.io-client'

import { storage } from './infra/firebase-config'
import { SOCKET_IO_SERVER_URL } from './service/utils'
import { AntSider } from './components/Sider';
import { HeaderDefault } from './components/Header';

// const socket = io(SOCKET_IO_SERVER_URL)
// socket.on('connect', () => console.log("[IO] Connect => New Connection"))

export const App = ({ children, noSider }: { children: JSX.Element, noSider?: boolean }) => {
  // const [videoUpload, setVideoUpload] = useState<any>(null)
  // const [onLoadingUpload, setOnLoadingUpload] = useState<Boolean>(false)
  // const [fileUrl, setFileUrl] = useState<any>(null)
  // const [progress, setProgress] = useState<any>(0);
  // const [paused, setPaused] = useState(false)
  // const [started, setStarted] = useState(false)
  // const [timer, setTimer] = useState<any>(null)

  // const uploadVideo = () => {
  //   setOnLoadingUpload(true)
  //   if (videoUpload == null) return;
  //   const videoRef = ref(storage, `videos/${videoUpload.name + uuid()}`)
  //   const uploadTask = uploadBytesResumable(videoRef, videoUpload)
  //   uploadTask.on('state_changed',
  //     (snapshot) => {
  //       const uploadProgress = Number((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed()
  //       setProgress(uploadProgress)
  //       switch (snapshot.state) {
  //         case 'paused':
  //           console.log('Upload is paused');
  //           break;
  //         case 'running':
  //           console.log('Upload is running');
  //           break;
  //       }
  //     },
  //     (error: any) => {
  //       console.error(error)
  //     },
  //     () => {
  //       setOnLoadingUpload(false)
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setFileUrl(downloadURL);
  //       });
  //     }
  //   )
  // }

  // const handleUpdateVideoUpload = (event: any) => {
  //   if (event.target.files) {
  //     setVideoUpload(event.target.files[0])
  //   }
  // }

  // function startPlaying() {
  //   let totalTime: any = 0

  //   window.setInterval(function () {
  //     if (!paused) {
  //       totalTime += 1;
  //       setTimer(Number(totalTime))
  //     }
  //   }, 1000)
  // }

  // function pausePlaying() {
  //   setPaused(true)
  //   if (timer) clearInterval(timer);
  // }

  // function getTimer() {
  //   const DivVideoPlayer: any = (document.getElementById('video-player') as HTMLVideoElement)
  //   let videoPlayer: any = DivVideoPlayer.firstChild?.currentTime || '';
  //   console.log(videoPlayer)
  // }

  return (
    <HeaderDefault children={
      !noSider ?
        <AntSider children={children} />
        :
        children
    } />

    // <div className="App">
    //   <input type="file" onChange={(event) => handleUpdateVideoUpload(event)} />
    //   {onLoadingUpload && !fileUrl && (<Progress percent={Number(progress)} />)}

    //   <button onClick={() => uploadVideo()}> Upload</button>
    //   <button onClick={() => getTimer()}> getTimer</button>

    //   {!fileUrl && (
    //     <ReactPlayer
    //       // onPlay={() => startPlaying()}
    //       onPause={() => pausePlaying()}
    //       onStart={() => { setStarted(true); startPlaying() }}
    //       id="video-player"
    //       width="100%"
    //       height="100%"
    //       controls={true}
    //       url={'https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/videos%2FBigBuckBunny.mp4403cfc17-5cc7-4d0f-1c00-045009b21cce?alt=media&token=9932e81f-24f5-4350-95c4-0e5dd9c4eba7'}
    //       config={{ file: { attributes: { controlsList: "nodownload" } } }}
    //     />
    //   )}
    // </div>
  )
}
