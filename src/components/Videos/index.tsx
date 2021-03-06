import React, { FC, useCallback, useState } from 'react'
import { Video } from '../../api/types'
import MediaFullPreview from '../common/MediaFullPreview'

import SectionRoot from '../common/SectionRoot'
import Modal from '../common/Modal'
import ModalContentWrapper from '../common/Modal/ModalContentWrapper'

import bgImage from '../../static/images/bg3.png'
import Title from '../common/Title'
import Container from '../common/Container'
import Tabs from '../common/Tabs'
import Grid from '../common/Grid'
import { AspectRatio } from '../common/AspectRatioImage'
import Placeholder from '../common/Placeholder'

const tabs = [
  { id: 'all', label: 'Все видео' },
  { id: 'clips', label: 'Клипы' },
  { id: 'concerts', label: 'Концертные' },
  { id: 'ethers', label: 'Эфиры' },
  { id: 'other', label: 'Другое' },
]

interface Props {
  list?: Video[]
}

const Videos: FC<Props> = ({ list }) => {
  const [currentTab, setTab] = useState('all')

  const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(null)

  const filteredList =
    currentTab === 'all' ? list : list?.filter(video => video.type === currentTab)

  const onChangeTab = useCallback(tabId => {
    setTab(tabId)
  }, [])

  const showFull = (videoId: number) => {
    if (filteredList) {
      const targetIndex = filteredList.findIndex(video => video.id === videoId)
      const targetVideo = filteredList[targetIndex]

      if (targetVideo != null) {
        setCurrentVideo(targetVideo)
        setCurrentVideoIndex(targetIndex)
      }
    }
  }

  return (
    <SectionRoot bgImage={bgImage} opacity={0.5}>
      {list?.length ? (
        <Container>
          <Title withMargin>Видео</Title>
          <Tabs tabs={tabs} activeTab={currentTab} onChange={onChangeTab} />
          <Grid>
            {filteredList != null &&
              filteredList.map(video => {
                return (
                  <MediaFullPreview
                    key={video.id}
                    text={video.title}
                    image={video.preview?.url || ''}
                    aspectRatio={AspectRatio['16:9']}
                    mode="video"
                    onClick={() => {
                      showFull(video.id)
                    }}
                  />
                )
              })}
          </Grid>
          <Modal isOpened={!!currentVideo}>
            <ModalContentWrapper
              itemList={filteredList || []}
              setCurrentIndex={setCurrentVideoIndex}
              setCurrentItem={setCurrentVideo}
              currentIndex={currentVideoIndex}
            >
              {currentVideo && (
                <div style={{ position: 'relative', width: '70vw', paddingBottom: '56.25%' }}>
                  {currentVideo.src}
                  <iframe
                    style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                    src={`${currentVideo.src}?autoplay=1`}
                    title={currentVideo.title}
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
            </ModalContentWrapper>
          </Modal>
        </Container>
      ) : (
        <Container>
          <Title withMargin>Видео</Title>
          <Placeholder sectionName="Видео" />
        </Container>
      )}
    </SectionRoot>
  )
}

export default Videos
