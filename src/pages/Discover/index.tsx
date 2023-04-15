import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { realtime_db } from "../../infra/firebase-config";

import {
  ref,
  set,
} from "firebase/database";
import uuid from 'react-uuid';
import { apiRequest } from '../../service/config-http';
import { DiscoveredVideo } from '../../interface/discoveredVideo';
import { Avatar, Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faUserAlt } from '@fortawesome/free-solid-svg-icons';

export const Discover = () => {

  const [discoveredVideos, setDiscoveredVideos] = useState<Array<DiscoveredVideo>>()
  const [mainVideo, setMainVideo] = useState<DiscoveredVideo>()
  const [secundaryVideo, setSecundaryVideo] = useState<DiscoveredVideo>()

  // async function writeFile() {
  //   const obj = {
  //     author: 'user1',
  //     videoUrlStorage: 'https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/videos%2FBigBuckBunny.mp4403cfc17-5cc7-4d0f-1c00-045009b21cce?alt=media&token=9932e81f-24f5-4350-95c4-0e5dd9c4eba7',
  //     thumbnail: 'https://firebasestorage.googleapis.com/v0/b/videozone-streaming.appspot.com/o/thumbnails%2Fbatman.jpg?alt=media&token=76d18fd0-486d-4af4-8685-c4eaaef3acad',
  //     createAt: '2023-04-14'
  //   }

  //   await set(
  //     ref(realtime_db, `videos/${uuid()}`),
  //     obj
  //   );
  // }

  const getDiscoveredVideos = async () => {
    await apiRequest.get('videos')
      .then((response) => {
        const { data } = response
        const mainVideoObject = data[0]
        const secundaryObject = data[1]

        let newArrayData = data.slice(2)

        setMainVideo(mainVideoObject)
        setSecundaryVideo(secundaryObject)
        setDiscoveredVideos(newArrayData)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getDiscoveredVideos()
  }, [])

  useEffect(() => {
    if (discoveredVideos) {
      console.log('main: ', mainVideo)
      console.log('secundary: ', secundaryVideo)
      console.log(discoveredVideos)
    }

  }, [discoveredVideos])


  return (
    <>
      <S.DiscoverContainer>
        <h1>Discover</h1>
        <S.VideosDiscoverContainer>
          <S.MainVideoContainer>
            <img src={mainVideo?.thumbnail} alt="" />
            <div className="author-container">
              <Badge className="verified-icon" count={<FontAwesomeIcon icon={faCircleCheck} />} offset={[0, 30]}>
                <Avatar className="avatar-account" size="large" icon={<FontAwesomeIcon icon={faUserAlt} />} />
              </Badge>

              <span className="author-name">{mainVideo?.author}</span>

            </div>
          </S.MainVideoContainer>
          <S.SecundaryVideoContainer>1</S.SecundaryVideoContainer>
        </S.VideosDiscoverContainer>
      </S.DiscoverContainer>
    </>
  )
}