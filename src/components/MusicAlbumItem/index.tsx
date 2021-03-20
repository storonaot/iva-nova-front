/* eslint-disable react/no-danger */
import React, { FC } from 'react'
import Container from '../common/Container'
import Title from '../common/Title'
import Link from '../common/Link'
import HTMLContent from '../common/HTMLContent'
import AspectRatioImage, { AspectRatio } from '../common/AspectRatioImage'
import Track from '../common/Track'
import bgImage from '../../static/images/bg2.jpg'
import SectionRoot from '../common/SectionRoot'

import { MUSIC_URL } from '../../constants/sources'

import {
  ITunesButton,
  YaMusicButton,
  SubscribeTitle,
  SubscriptionsWrapper,
} from '../common/Subscriptions'

import {
  MainHeading,
  ImageWrapper,
  NumericList,
  NumericListItem,
  TrackListWrapper,
  TrackList,
  AlbumInfoWrapper,
  SubscribtionsWrapper,
  ContentWrapper,
} from './styles'
import { Album, TrackItem } from '../../api/types'
import { getFullMediaUrl } from '../../helpers'

interface Props {
  item: Album
}

const MusicAlbumItem: FC<Props> = ({ item }) => {
  const shouldShowSubscriptionLinks = item.ya_music_src || item.itunes_src

  return (
    <SectionRoot bgImage={bgImage} bgRepeat="x">
      <Container>
        <MainHeading>
          <Title isUpCase>
            {item.title} / {new Date(item.date).getFullYear()}
          </Title>
          <Link href={`${MUSIC_URL}`}>Все альбомы</Link>
        </MainHeading>
        <AlbumInfoWrapper>
          <ImageWrapper>
            <AspectRatioImage
              imageUrl={getFullMediaUrl(item.cover.url)}
              aspectRatio={AspectRatio['1:1']}
            />
          </ImageWrapper>
          <TrackListWrapper>
            <SubscribeTitle>Треклист</SubscribeTitle>
            <NumericList>
              {item.tracks.map(track => (
                <NumericListItem key={track.id}>{track.title}</NumericListItem>
              ))}
            </NumericList>
          </TrackListWrapper>
        </AlbumInfoWrapper>
        {shouldShowSubscriptionLinks && (
          <SubscribtionsWrapper>
            <SubscribeTitle withMargin={false}>Послушать и скачать альбом:</SubscribeTitle>
            <SubscriptionsWrapper>
              {item.ya_music_src && <YaMusicButton href={item.ya_music_src} />}
              {item.itunes_src && <ITunesButton href={item.itunes_src} />}
            </SubscriptionsWrapper>
          </SubscribtionsWrapper>
        )}
        <ContentWrapper>
          <HTMLContent inputString={item.description} />
        </ContentWrapper>
        <TrackList>
          {item.tracks.map((track: TrackItem) => (
            <Track key={track.id} track={track} />
          ))}
        </TrackList>
      </Container>
    </SectionRoot>
  )
}

export default MusicAlbumItem
