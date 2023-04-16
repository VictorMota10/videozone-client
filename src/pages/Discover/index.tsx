import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { realtime_db } from "../../infra/firebase-config";

import {
  ref,
  set,
} from "firebase/database";
import uuid from 'react-uuid';
import TimeAgo from 'react-timeago';

import { apiRequest } from '../../service/config-http';
import { DiscoveredVideo } from '../../interface/discoveredVideo';
import { Avatar, Badge, Col, Row, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const Discover = () => {

  const navigate = useNavigate()

  const [discoveredVideos, setDiscoveredVideos] = useState<Array<DiscoveredVideo>>()
  const [mainVideo, setMainVideo] = useState<DiscoveredVideo>()
  const [secundaryVideo, setSecundaryVideo] = useState<DiscoveredVideo>()
  const [thirdVideo, setThirdVideo] = useState<DiscoveredVideo>()

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

        setMainVideo(data[0])
        setSecundaryVideo(data[1])
        setThirdVideo(data[2])

        let newArrayData = data.slice(3)

        setDiscoveredVideos(newArrayData.slice(0, 8))
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
      console.log(discoveredVideos)
    }
  }, [discoveredVideos])

  const goToVideoPlayer = (videoUuid?: string) => {
    navigate(`/video-uuid=${videoUuid}`)
  }

  return (
    <>
      <S.DiscoverContainer>
        <h1>Discover</h1>
        <S.VideosDiscoverContainer>
          <S.MainVideoContainer onClick={() => goToVideoPlayer(mainVideo?.videoUuid)}>
            {!mainVideo ?
              <Skeleton.Input className="skeleton-loading" active={true} />
              :
              <img className="thumbnail-img" src={mainVideo?.thumbnail} alt="" />
            }
            <div className="author-container">
              <h3 className="video-title">Video title here DASKSDAJKDASkjASDASDJkASDjASDKASDJk</h3>

              <div className="author-info">
                <div className="video-infos">
                  {!mainVideo ? <Skeleton.Input active={true} />
                    :
                    <>
                      <span className="author-name">{mainVideo?.author}</span>
                      <TimeAgo className="create-at" date={new Date(mainVideo?.createAt || '')} />
                    </>
                  }
                </div>
                <Badge className="verified-icon" count={<FontAwesomeIcon icon={faCircleCheck} />} offset={[0, 30]}>
                  <Avatar className="avatar-account" size="large" icon={<FontAwesomeIcon icon={faUserAlt} />} />
                </Badge>
              </div>

            </div>
          </S.MainVideoContainer>
          <S.SecundaryVideoContainer onClick={() => goToVideoPlayer(secundaryVideo?.videoUuid)} >
            {!mainVideo ?
              <Skeleton.Input className="skeleton-loading" active={true} />
              :
              <img className="thumbnail-img" src={secundaryVideo?.thumbnail} alt="" />
            }
            <div className="author-container">
              <h3 className="video-title">Video title here</h3>
              <div className="author-info">
                <div className="video-infos">
                  <span className="author-name">{secundaryVideo?.author}</span>
                  <TimeAgo className="create-at" date={new Date(secundaryVideo?.createAt || '')} />
                </div>
                <Badge className="verified-icon" count={<FontAwesomeIcon icon={faCircleCheck} />} offset={[0, 30]}>
                  <Avatar className="avatar-account" size="large" icon={<FontAwesomeIcon icon={faUserAlt} />} />
                </Badge>
              </div>
            </div>
          </S.SecundaryVideoContainer>
          <S.ThirdVideoContainer onClick={() => goToVideoPlayer(thirdVideo?.videoUuid)} >
            {!mainVideo ?
              <Skeleton.Input className="skeleton-loading" active={true} />
              :
              <img className="thumbnail-img" src={thirdVideo?.thumbnail} alt="" />
            }
            <div className="author-container">
              <h3 className="video-title">Video title here</h3>
              <div className="author-info">
                <div className="video-infos">
                  <span className="author-name">{thirdVideo?.author}</span>
                  <TimeAgo className="create-at" date={new Date(thirdVideo?.createAt || '')} />
                </div>
                <Badge className="verified-icon" count={<FontAwesomeIcon icon={faCircleCheck} />} offset={[0, 30]}>
                  <Avatar className="avatar-account" size="large" icon={<FontAwesomeIcon icon={faUserAlt} />} />
                </Badge>
              </div>
            </div>
          </S.ThirdVideoContainer>
        </S.VideosDiscoverContainer>
        <S.AnotherVideosContinainer>
          <Row gutter={[16, 24]}>
            {discoveredVideos?.map((video: DiscoveredVideo, key: any) => {
              return (
                <Col className="gutter-row" span={6}>
                  {!discoveredVideos ?
                    <Skeleton.Input className="skeleton-card" active={true} />
                    :
                    <div className="another-video-card">
                      <img src={video.thumbnail} alt="thumb" />
                      <div className="info-video">
                        <div className="details">
                          <span>{video.author} - <TimeAgo className="create-at" date={new Date(thirdVideo?.createAt || '')} /></span>
                          <h3>Video title</h3>
                        </div>
                        <div className="author-avatar">
                          <div className="circle-avatar">
                            <Badge className="verified-icon" count={<FontAwesomeIcon icon={faCircleCheck} />} offset={[0, 50]}>
                              <Avatar className="avatar-account-video" size="large" icon={<img src={video.authorChanelLogo} alt="chanel-logo" /> ||<FontAwesomeIcon icon={faUserAlt} />} />
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </Col>
              )
            })}
          </Row>

        </S.AnotherVideosContinainer>
      </S.DiscoverContainer>
    </>
  )
}